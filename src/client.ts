import { HttpClient } from './http';
import type {
    ApplicationAPIResponse,
    ApplicationListResponse,
    ApplicationResponseListResponse,
    AuditLogListResponse,
    JoinRequestAPIResponse,
    JoinRequestListResponse,
    LOAAPIResponse,
    LOAListResponse,
    LogAPIResponse,
    LogListResponse,
    MemberAPIResponse,
    MemberListResponse,
    RoleAPIResponse,
    RoleListResponse,
    ServerAPIResponse,
    ShiftAPIResponse,
    ShiftListResponse,
} from './types';
import { validateId, validatePaginationParams, validateToken } from './utils/validation';

/**
 * Configuration options for the Melonly client
 */
export interface ClientOptions {
  /** API token for authentication */
  token: string;
  /** Base URL for the API (defaults to production) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Enable debug logging (default: false) */
  debug?: boolean;
  /** Custom headers to include with requests */
  headers?: Record<string, string>;
}

/**
 * Pagination parameters for list endpoints
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page (1-100) */
  limit?: number;
  [key: string]: unknown;
}

/**
 * Official Melonly API client with full TypeScript support
 * 
 * @example
 * ```typescript
 * import { MelonlyClient } from '@melonly/api-client';
 * 
 * const client = new MelonlyClient({ token: 'your-api-token' });
 * 
 * // Get server information
 * const serverInfo = await client.getServerInfo();
 * 
 * // List applications with pagination
 * const applications = await client.getApplications({ page: 1, limit: 20 });
 * ```
 */
export class MelonlyClient {
  private readonly http: HttpClient;

  constructor(options: ClientOptions) {
    validateToken(options.token);

    this.http = new HttpClient({
      baseUrl: options.baseUrl ?? 'https://pubapitestingalphayes.melonly.xyz/api/v1',
      token: options.token,
      timeout: options.timeout ?? 30000,
      maxRetries: options.maxRetries ?? 3,
      debug: options.debug ?? false,
      headers: options.headers,
    });
  }

  // --- Applications ---

  /**
   * Retrieve a paginated list of applications
   * @param params - Pagination parameters
   * @returns Promise resolving to application list with pagination info
   */
  async getApplications(params: PaginationParams = {}): Promise<ApplicationListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/applications', params);
  }

  /**
   * Retrieve a specific application by ID
   * @param applicationId - The application ID
   * @returns Promise resolving to the application data
   */
  async getApplication(applicationId: string): Promise<ApplicationAPIResponse> {
    validateId(applicationId, 'applicationId');
    return this.http.get(`/server/applications/${encodeURIComponent(applicationId)}`);
  }

  /**
   * Retrieve responses for a specific application
   * @param applicationId - The application ID
   * @param params - Pagination parameters
   * @returns Promise resolving to application responses with pagination info
   */
  async getApplicationResponses(
    applicationId: string,
    params: PaginationParams = {}
  ): Promise<ApplicationResponseListResponse> {
    validateId(applicationId, 'applicationId');
    validatePaginationParams(params);
    return this.http.get(
      `/server/applications/${encodeURIComponent(applicationId)}/responses`,
      params
    );
  }

  /**
   * Retrieve application responses for a specific user
   * @param userId - The user ID
   * @param params - Pagination parameters
   * @returns Promise resolving to user's application responses
   */
  async getUserApplicationResponses(
    userId: string,
    params: PaginationParams = {}
  ): Promise<ApplicationResponseListResponse> {
    validateId(userId, 'userId');
    validatePaginationParams(params);
    return this.http.get(
      `/server/applications/user/${encodeURIComponent(userId)}/responses`,
      params
    );
  }

  // --- Audit Logs ---

  /**
   * Retrieve a paginated list of audit logs
   * @param params - Pagination parameters
   * @returns Promise resolving to audit logs with pagination info
   */
  async getAuditLogs(params: PaginationParams = {}): Promise<AuditLogListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/audit-logs', params);
  }

  // --- Server Info ---

  /**
   * Retrieve server information
   * @returns Promise resolving to server information
   */
  async getServerInfo(): Promise<ServerAPIResponse> {
    return this.http.get('/server/info');
  }

  // --- Join Requests ---

  /**
   * Retrieve a paginated list of join requests
   * @param params - Pagination parameters
   * @returns Promise resolving to join requests with pagination info
   */
  async getJoinRequests(params: PaginationParams = {}): Promise<JoinRequestListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/join-requests', params);
  }

  /**
   * Retrieve a specific join request by user ID
   * @param userId - The user ID
   * @returns Promise resolving to the join request data
   */
  async getJoinRequest(userId: string): Promise<JoinRequestAPIResponse> {
    validateId(userId, 'userId');
    return this.http.get(`/server/join-requests/${encodeURIComponent(userId)}`);
  }

  // --- LOAs (Leave of Absence) ---

  /**
   * Retrieve a paginated list of LOAs
   * @param params - Pagination parameters
   * @returns Promise resolving to LOAs with pagination info
   */
  async getLOAs(params: PaginationParams = {}): Promise<LOAListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/loas', params);
  }

  /**
   * Retrieve a specific LOA by ID
   * @param loaId - The LOA ID
   * @returns Promise resolving to the LOA data
   */
  async getLOA(loaId: string): Promise<LOAAPIResponse> {
    validateId(loaId, 'loaId');
    return this.http.get(`/server/loas/${encodeURIComponent(loaId)}`);
  }

  /**
   * Retrieve LOAs for a specific member
   * @param memberId - The member ID
   * @param params - Pagination parameters
   * @returns Promise resolving to member's LOAs
   */
  async getUserLOAs(memberId: string, params: PaginationParams = {}): Promise<LOAListResponse> {
    validateId(memberId, 'memberId');
    validatePaginationParams(params);
    return this.http.get(`/server/loas/user/${encodeURIComponent(memberId)}`, params);
  }

  // --- Logs ---

  /**
   * Retrieve a paginated list of logs
   * @param params - Pagination parameters
   * @returns Promise resolving to logs with pagination info
   */
  async getLogs(params: PaginationParams = {}): Promise<LogListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/logs', params);
  }

  /**
   * Retrieve a specific log by ID
   * @param logId - The log ID
   * @returns Promise resolving to the log data
   */
  async getLog(logId: string): Promise<LogAPIResponse> {
    validateId(logId, 'logId');
    return this.http.get(`/server/logs/${encodeURIComponent(logId)}`);
  }

  /**
   * Retrieve logs created by a specific staff member
   * @param staffId - The staff member ID
   * @param params - Pagination parameters
   * @returns Promise resolving to staff member's logs
   */
  async getStaffLogs(staffId: string, params: PaginationParams = {}): Promise<LogListResponse> {
    validateId(staffId, 'staffId');
    validatePaginationParams(params);
    return this.http.get(`/server/logs/staff/${encodeURIComponent(staffId)}`, params);
  }

  /**
   * Retrieve logs for a specific user
   * @param username - The username
   * @param params - Pagination parameters
   * @returns Promise resolving to user's logs
   */
  async getUserLogs(username: string, params: PaginationParams = {}): Promise<LogListResponse> {
    if (!username?.trim()) {
      throw new Error('Username is required and cannot be empty');
    }
    validatePaginationParams(params);
    return this.http.get(`/server/logs/user/${encodeURIComponent(username)}`, params);
  }

  // --- Members ---

  /**
   * Retrieve a paginated list of server members
   * @param params - Pagination parameters
   * @returns Promise resolving to members with pagination info
   */
  async getMembers(params: PaginationParams = {}): Promise<MemberListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/members', params);
  }

  /**
   * Retrieve a specific member by ID
   * @param memberId - The member ID
   * @returns Promise resolving to the member data
   */
  async getMember(memberId: string): Promise<MemberAPIResponse> {
    validateId(memberId, 'memberId');
    return this.http.get(`/server/members/${encodeURIComponent(memberId)}`);
  }

  /**
   * Retrieve a member by their Discord ID
   * @param discordId - The Discord user ID
   * @returns Promise resolving to the member data
   */
  async getMemberByDiscordId(discordId: string): Promise<MemberAPIResponse> {
    validateId(discordId, 'discordId');
    return this.http.get(`/server/members/discord/${encodeURIComponent(discordId)}`);
  }

  // --- Roles ---

  /**
   * Retrieve a paginated list of roles
   * @param params - Pagination parameters
   * @returns Promise resolving to roles with pagination info
   */
  async getRoles(params: PaginationParams = {}): Promise<RoleListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/roles', params);
  }

  /**
   * Retrieve a specific role by ID
   * @param roleId - The role ID
   * @returns Promise resolving to the role data
   */
  async getRole(roleId: string): Promise<RoleAPIResponse> {
    validateId(roleId, 'roleId');
    return this.http.get(`/server/roles/${encodeURIComponent(roleId)}`);
  }

  // --- Shifts ---

  /**
   * Retrieve a paginated list of shifts
   * @param params - Pagination parameters
   * @returns Promise resolving to shifts with pagination info
   */
  async getShifts(params: PaginationParams = {}): Promise<ShiftListResponse> {
    validatePaginationParams(params);
    return this.http.get('/server/shifts', params);
  }

  /**
   * Retrieve a specific shift by ID
   * @param shiftId - The shift ID
   * @returns Promise resolving to the shift data
   */
  async getShift(shiftId: string): Promise<ShiftAPIResponse> {
    validateId(shiftId, 'shiftId');
    return this.http.get(`/server/shifts/${encodeURIComponent(shiftId)}`);
  }
}