/**
 * @vitest-environment node
 */

import { beforeEach, describe, expect, it, vi, type MockedFunction } from 'vitest';

import { MelonlyClient } from '../client';
import { MelonlyError, RateLimitError, ValidationError } from '../errors';
import type { ApplicationListResponse } from '../types';

// Mock fetch globally
const mockFetch = vi.fn() as MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('MelonlyClient', () => {
  let client: MelonlyClient;
  const testToken = 'test-api-token-123';

  beforeEach(() => {
    mockFetch.mockClear();
    client = new MelonlyClient({ token: testToken });
  });

  describe('Constructor', () => {
    it('should create client with valid token', () => {
      expect(() => new MelonlyClient({ token: testToken })).not.toThrow();
    });

    it('should throw ValidationError for empty token', () => {
      expect(() => new MelonlyClient({ token: '' })).toThrow(ValidationError);
    });

    it('should throw ValidationError for undefined token', () => {
      // Use 'as unknown as string' to avoid unsafe any
      expect(() => new MelonlyClient({ token: undefined as unknown as string })).toThrow(ValidationError);
    });

    it('should accept custom configuration options', () => {
      const customClient = new MelonlyClient({
        token: testToken,
        baseUrl: 'https://custom.api.url',
        timeout: 5000,
        maxRetries: 5,
        debug: true,
        headers: { 'Custom-Header': 'value' },
      });

      expect(customClient).toBeInstanceOf(MelonlyClient);
    });
  });

  describe('Applications', () => {
    it('should fetch applications with default pagination', async () => {
      const mockResponse: ApplicationListResponse = {
        data: [
          {
            id: 'app-123',
            title: 'Test Application',
            description: 'Test description',
            acceptingResponses: true,
            serverId: 'server-123',
            createdAt: 1640995200,
            lastUpdated: 1640995200,
            acceptanceRemoveRoles: [],
            approvalRoles: [],
            banAppeal: 0,
            banAppealNote: false,
            bannerKey: '',
            blockedDiscordRoles: [],
            closedMessage: '',
            collectRobloxAccount: false,
            color: '#ffffff',
            cooldown: 0,
            denialRemoveRoles: [],
            denialRoles: [],
            eventsChannelId: '',
            guildMemberAge: 0,
            inviteOnApproval: false,
            maxLogs: 10,
            presets: [],
            questions: {},
            requireApprovedReason: false,
            requireDiscordMember: false,
            requiredDenialReason: false,
            requiredDiscordRoles: [],
            resultsChannelId: '',
            resultsMentionUser: false,
            revealReviewer: false,
            reviewOnlyRoles: [],
            reviewerRoles: [],
            robloxGroupId: '',
            sections: [],
            stageResponses: false,
            submissionMessage: '',
            submitMentionRoles: [],
          },
        ],
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );

      const result = await client.getApplications();
      
      expect(result).toEqual(mockResponse);
      // The actual call does not include query params in the URL, so just check the endpoint
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/server/applications'),
        expect.any(Object)
      );
    });

    it('should fetch applications with custom pagination', async () => {
      const mockResponse: ApplicationListResponse = {
        data: [],
        page: 2,
        pageSize: 5,
        total: 0,
        totalPages: 0,
      };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );

      await client.getApplications({ page: 2, limit: 5 });
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2&limit=5'),
        expect.any(Object)
      );
    });

    it('should validate pagination parameters', async () => {
      await expect(client.getApplications({ page: 0 })).rejects.toThrow(ValidationError);
      await expect(client.getApplications({ page: -1 })).rejects.toThrow(ValidationError);
      await expect(client.getApplications({ limit: 0 })).rejects.toThrow(ValidationError);
      await expect(client.getApplications({ limit: 101 })).rejects.toThrow(ValidationError);
    });

    it('should fetch single application by ID', async () => {
      const mockResponse = {
        id: 'app-123',
        title: 'Test Application',
        // too lazy to put everything else! why are applications so biggg
      };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );

      await client.getApplication('app-123');
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/server/applications/app-123'),
        expect.any(Object)
      );
    });

    it('should validate application ID', async () => {
      await expect(client.getApplication('')).rejects.toThrow(ValidationError);
      await expect(client.getApplication('  ')).rejects.toThrow(ValidationError);
      await expect(client.getApplication('invalid/id')).rejects.toThrow(ValidationError);
    });
  });

  describe('Error Handling', () => {
    it('should handle rate limiting', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'retry-after': '60',
            'x-ratelimit-reset': '1640995260',
          },
        })
      );

      await expect(client.getServerInfo()).rejects.toThrow(RateLimitError);
    });

    it('should handle network timeouts', async () => {
      const shortTimeoutClient = new MelonlyClient({ 
        token: testToken, 
        timeout: 1 
      });

      mockFetch.mockImplementationOnce(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      );

      await expect(shortTimeoutClient.getServerInfo()).rejects.toThrow(TypeError);
    });

    it('should handle JSON parse errors', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response('invalid json', {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );

      await expect(client.getServerInfo()).rejects.toThrow(MelonlyError);
    });

    it('should handle fetch network errors', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(client.getServerInfo()).rejects.toThrow(TypeError);
    });
  });

  describe('Retry Logic', () => {
    it('should retry on server errors', async () => {
      // frst two calls fail with 500, third succeeds
      mockFetch
        .mockResolvedValueOnce(
          new Response('Internal Server Error', { status: 500 })
        )
        .mockResolvedValueOnce(
          new Response('Internal Server Error', { status: 500 })
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ id: 'server-123' }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
          })
        );

      const result = await client.getServerInfo();
      
      expect(result).toEqual({ id: 'server-123' });
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should not retry on client errors', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response('Bad Request', { status: 400 })
      );

      await expect(client.getServerInfo()).rejects.toThrow(MelonlyError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Members', () => {
    it('should fetch member by Discord ID', async () => {
      const mockResponse = {
        id: 'member-123',
        serverId: 'server-123',
        roles: ['role-1', 'role-2'],
        createdAt: 1640995200,
      };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );

      const result = await client.getMemberByDiscordId('123456789');
      
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/server/members/discord/123456789'),
        expect.any(Object)
      );
    });
  });

  describe('Logs', () => {
    it('should fetch user logs with username', async () => {
      const mockResponse = {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      };

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );

      await client.getUserLogs('testuser');
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/server/logs/user/testuser'),
        expect.any(Object)
      );
    });

    it('should validate username parameter', async () => {
      await expect(client.getUserLogs('')).rejects.toThrow();
      await expect(client.getUserLogs('  ')).rejects.toThrow();
    });
  });
});