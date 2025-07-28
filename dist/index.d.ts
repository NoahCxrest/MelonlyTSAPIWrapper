/**
 * Auto-generated and enhanced types for Melonly API
 * Generated: 2025-07-28
 */
/**
 * Standard pagination metadata included in list responses
 */
interface PaginationMeta {
    /** Current page number (1-based) */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Total number of items across all pages */
    total: number;
    /** Total number of pages */
    totalPages: number;
}
/**
 * Generic paginated response wrapper
 */
interface PaginatedResponse<T> extends PaginationMeta {
    /** Array of data items for current page */
    data: T[];
}
/**
 * Standard error response format
 */
interface ErrorResponse {
    /** Error message describing what went wrong */
    error: string;
}
/**
 * Bad request error (400)
 */
interface BadRequestResponse extends ErrorResponse {
}
/**
 * Unauthorized error (401)
 */
interface UnauthorizedResponse extends ErrorResponse {
}
/**
 * Not found error (404)
 */
interface NotFoundResponse extends ErrorResponse {
}
/**
 * Internal server error (500)
 */
interface InternalServerErrorResponse extends ErrorResponse {
}
/**
 * Application configuration and metadata
 */
interface ApplicationAPIResponse {
    /** Roles removed when application is accepted */
    acceptanceRemoveRoles: string[];
    /** Whether the application is currently accepting responses */
    acceptingResponses: boolean;
    /** Roles that can approve applications */
    approvalRoles: string[];
    /** Ban appeal type identifier */
    banAppeal: number;
    /** Whether ban appeal note is required */
    banAppealNote: boolean;
    /** Banner image key for the application */
    bannerKey: string;
    /** Discord roles that are blocked from applying */
    blockedDiscordRoles: string[];
    /** Message shown when application is closed */
    closedMessage: string;
    /** Whether to collect Roblox account information */
    collectRobloxAccount: boolean;
    /** Application theme color */
    color: string;
    /** Cooldown period between applications (in seconds) */
    cooldown: number;
    /** Application creation timestamp (Unix) */
    createdAt: number;
    /** Roles removed when application is denied */
    denialRemoveRoles: string[];
    /** Roles added when application is denied */
    denialRoles: string[];
    /** Application description */
    description: string;
    /** Discord channel ID for application events */
    eventsChannelId: string;
    /** Required guild member age (in days) */
    guildMemberAge: number;
    /** Unique application identifier */
    id: string;
    /** Whether to invite user on approval */
    inviteOnApproval: boolean;
    /** Last update timestamp (Unix) */
    lastUpdated: number;
    /** Maximum number of logs allowed */
    maxLogs: number;
    /** Application presets configuration */
    presets: unknown[];
    /** Application questions configuration */
    questions: Record<string, unknown>;
    /** Whether approved reason is required */
    requireApprovedReason: boolean;
    /** Whether Discord membership is required */
    requireDiscordMember: boolean;
    /** Whether denial reason is required */
    requiredDenialReason: boolean;
    /** Discord roles required to apply */
    requiredDiscordRoles: string[];
    /** Discord channel ID for application results */
    resultsChannelId: string;
    /** Whether to mention user in results */
    resultsMentionUser: boolean;
    /** Whether to reveal reviewer identity */
    revealReviewer: boolean;
    /** Roles that can only review (not approve/deny) */
    reviewOnlyRoles: string[];
    /** Roles that can review applications */
    reviewerRoles: string[];
    /** Associated Roblox group ID */
    robloxGroupId: string;
    /** Application sections configuration */
    sections: unknown[];
    /** Server ID this application belongs to */
    serverId: string;
    /** Whether responses are staged */
    stageResponses: boolean;
    /** Message shown on successful submission */
    submissionMessage: string;
    /** Roles to mention on submission */
    submitMentionRoles: string[];
    /** Application title */
    title: string;
}
/**
 * Paginated list of applications
 */
interface ApplicationListResponse extends PaginatedResponse<ApplicationAPIResponse> {
}
/**
 * Application response/submission data
 */
interface ApplicationResponseAPIResponse {
    /** User's answers to application questions */
    answers: Record<string, unknown>;
    /** ID of the application this response belongs to */
    applicationId: string;
    /** Reviewer comments on the response */
    comments: Record<string, unknown>;
    /** Response creation timestamp (Unix) */
    createdAt: number;
    /** Response finalization timestamp (Unix) */
    finalizedAt: number;
    /** ID of user who finalized the response */
    finalizedBy: string;
    /** Flagged sections or issues */
    flagged: Record<string, unknown>;
    /** Unique response identifier */
    id: string;
    /** Reason for approval/denial */
    reason: string;
    /** Response review timestamp (Unix) */
    reviewedAt: number;
    /** ID of user who reviewed the response */
    reviewedBy: string;
    /** Applicant's Roblox user ID */
    robloxId: string;
    /** Current staging status */
    stagingStatus: number;
    /** Current response status */
    status: number;
    /** Discord user ID of applicant */
    userId: string;
}
/**
 * Paginated list of application responses
 */
interface ApplicationResponseListResponse extends PaginatedResponse<ApplicationResponseAPIResponse> {
}
/**
 * Audit log event entry
 */
interface AuditLogEventAPIResponse {
    /** Associated application ID (if applicable) */
    applicationId: string;
    /** Event description and metadata */
    description: Record<string, unknown>;
    /** Unique event identifier */
    id: string;
    /** Server ID where event occurred */
    serverId: string;
    /** Event timestamp (Unix) */
    timestamp: number;
    /** Event type identifier */
    type: number;
    /** User ID who triggered the event */
    userId: string;
}
/**
 * Paginated list of audit log events
 */
interface AuditLogListResponse extends PaginatedResponse<AuditLogEventAPIResponse> {
}
/**
 * Server join request data
 */
interface JoinRequestAPIResponse {
    /** Request creation timestamp (Unix) */
    createdAt: number;
    /** Join code for the request */
    joinCode: string;
    /** Server ID for the join request */
    serverId: string;
    /** User ID of the requester */
    userId: string;
}
/**
 * Paginated list of join requests
 */
interface JoinRequestListResponse extends PaginatedResponse<JoinRequestAPIResponse> {
}
/**
 * Leave of Absence record
 */
interface LOAAPIResponse {
    /** LOA cancellation timestamp (Unix) */
    cancelledAt: number;
    /** LOA creation timestamp (Unix) */
    createdAt: number;
    /** Reason for denial (if applicable) */
    denyReason: string;
    /** Scheduled end timestamp (Unix) */
    endAt: number;
    /** Actual end timestamp (Unix) */
    endedAt: number;
    /** ID of user who ended the LOA */
    endedBy: string;
    /** LOA expiration timestamp (Unix) */
    expiredAt: number;
    /** Extension requests for this LOA */
    extensionRequests: unknown[];
    /** Unique LOA identifier */
    id: string;
    /** Member ID this LOA belongs to */
    memberId: string;
    /** Reason for the leave of absence */
    reason: string;
    /** History of reason changes */
    reasonHistory: unknown[];
    /** LOA review timestamp (Unix) */
    reviewedAt: number;
    /** ID of user who reviewed the LOA */
    reviewedBy: string;
    /** Server ID this LOA belongs to */
    serverId: string;
    /** Scheduled start timestamp (Unix) */
    startAt: number;
    /** LOA start type */
    startType: number;
    /** Actual start timestamp (Unix) */
    startedAt: number;
    /** Current LOA status */
    status: number;
}
/**
 * Paginated list of LOAs
 */
interface LOAListResponse extends PaginatedResponse<LOAAPIResponse> {
}
/**
 * Moderation log entry
 */
interface LogAPIResponse {
    /** ID of user who completed the action */
    completedBy: string;
    /** Log creation timestamp (Unix) */
    createdAt: number;
    /** ID of user who created the log */
    createdBy: string;
    /** Log description */
    description: string;
    /** Users who have edited this log */
    editedBy: unknown[];
    /** Whether the log has expired */
    expired: boolean;
    /** Log expiration timestamp (Unix) */
    expiredAt: number;
    /** ID of user who expired the log */
    expiredBy: string;
    /** Whether the log is hidden */
    hidden: boolean;
    /** ID of user who hid the log */
    hiddenBy: string;
    /** Unique log identifier */
    id: string;
    /** Proof/evidence attachments */
    proof: unknown[];
    /** Target user's Roblox ID */
    robloxId: string;
    /** Server ID this log belongs to */
    serverId: string;
    /** Whether this is a temporary ban */
    tempBan: boolean;
    /** Log content/details */
    text: string;
    /** Log type identifier */
    type: number;
    /** Log type ID */
    typeId: string;
    /** Unban timestamp for temporary bans (Unix) */
    unbanAt: number;
    /** Target username */
    username: string;
}
/**
 * Paginated list of logs
 */
interface LogListResponse extends PaginatedResponse<LogAPIResponse> {
}
/**
 * Server member data
 */
interface MemberAPIResponse {
    /** Member join timestamp (Unix) */
    createdAt: number;
    /** Unique member identifier */
    id: string;
    /** Array of role IDs assigned to member */
    roles: string[];
    /** Server ID this member belongs to */
    serverId: string;
}
/**
 * Paginated list of members
 */
interface MemberListResponse extends PaginatedResponse<MemberAPIResponse> {
}
/**
 * Server role configuration
 */
interface RoleAPIResponse {
    /** Role color in hex format */
    colour: string;
    /** Role creation timestamp (Unix) */
    createdAt: number;
    /** Additional permissions flags */
    extraPermissions: number;
    /** Unique role identifier */
    id: string;
    /** Linked Discord role ID */
    linkedDiscordRoleId: string;
    /** Role display name */
    name: string;
    /** Permission flags string */
    permissions: string;
    /** Server ID this role belongs to */
    serverId: string;
}
/**
 * Paginated list of roles
 */
interface RoleListResponse extends PaginatedResponse<RoleAPIResponse> {
}
/**
 * Server information and configuration
 */
interface ServerAPIResponse {
    /** Server creation timestamp (Unix) */
    createdAt: number;
    /** Associated Discord guild ID */
    discordGuildId: string;
    /** Unique server identifier */
    id: string;
    /** Server join code */
    joinCode: string;
    /** Server display name */
    name: string;
    /** Server owner user ID */
    ownerId: string;
    /** Server roles configuration */
    roles: unknown[];
}
/**
 * Work shift record
 */
interface ShiftAPIResponse {
    /** Whether shift auto-ends */
    autoEnd: boolean;
    /** Break timestamps during shift */
    breakTimestamps: unknown[];
    /** Shift creation timestamp (Unix) */
    createdAt: number;
    /** Shift end timestamp (Unix) */
    endedAt: number;
    /** ID of user who ended the shift */
    endedBy: string;
    /** Unique shift identifier */
    id: string;
    /** Member ID this shift belongs to */
    memberId: string;
    /** Server ID this shift belongs to */
    serverId: string;
    /** Shift type/category */
    type: string;
    /** Shift wave number */
    wave: number;
}
/**
 * Paginated list of shifts
 */
interface ShiftListResponse extends PaginatedResponse<ShiftAPIResponse> {
}
/**
 * Union type of all possible API response types
 */
type APIResponse = ApplicationAPIResponse | ApplicationResponseAPIResponse | AuditLogEventAPIResponse | JoinRequestAPIResponse | LOAAPIResponse | LogAPIResponse | MemberAPIResponse | RoleAPIResponse | ServerAPIResponse | ShiftAPIResponse;
/**
 * Union type of all possible list response types
 */
type ListResponse = ApplicationListResponse | ApplicationResponseListResponse | AuditLogListResponse | JoinRequestListResponse | LOAListResponse | LogListResponse | MemberListResponse | RoleListResponse | ShiftListResponse;
/**
 * Union type of all possible error response types
 */
type ErrorResponseType = BadRequestResponse | UnauthorizedResponse | NotFoundResponse | InternalServerErrorResponse;

/**
 * Configuration options for the Melonly client
 */
interface ClientOptions {
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
interface PaginationParams {
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
declare class MelonlyClient {
    private readonly http;
    constructor(options: ClientOptions);
    /**
     * Retrieve a paginated list of applications
     * @param params - Pagination parameters
     * @returns Promise resolving to application list with pagination info
     */
    getApplications(params?: PaginationParams): Promise<ApplicationListResponse>;
    /**
     * Retrieve a specific application by ID
     * @param applicationId - The application ID
     * @returns Promise resolving to the application data
     */
    getApplication(applicationId: string): Promise<ApplicationAPIResponse>;
    /**
     * Retrieve responses for a specific application
     * @param applicationId - The application ID
     * @param params - Pagination parameters
     * @returns Promise resolving to application responses with pagination info
     */
    getApplicationResponses(applicationId: string, params?: PaginationParams): Promise<ApplicationResponseListResponse>;
    /**
     * Retrieve application responses for a specific user
     * @param userId - The user ID
     * @param params - Pagination parameters
     * @returns Promise resolving to user's application responses
     */
    getUserApplicationResponses(userId: string, params?: PaginationParams): Promise<ApplicationResponseListResponse>;
    /**
     * Retrieve a paginated list of audit logs
     * @param params - Pagination parameters
     * @returns Promise resolving to audit logs with pagination info
     */
    getAuditLogs(params?: PaginationParams): Promise<AuditLogListResponse>;
    /**
     * Retrieve server information
     * @returns Promise resolving to server information
     */
    getServerInfo(): Promise<ServerAPIResponse>;
    /**
     * Retrieve a paginated list of join requests
     * @param params - Pagination parameters
     * @returns Promise resolving to join requests with pagination info
     */
    getJoinRequests(params?: PaginationParams): Promise<JoinRequestListResponse>;
    /**
     * Retrieve a specific join request by user ID
     * @param userId - The user ID
     * @returns Promise resolving to the join request data
     */
    getJoinRequest(userId: string): Promise<JoinRequestAPIResponse>;
    /**
     * Retrieve a paginated list of LOAs
     * @param params - Pagination parameters
     * @returns Promise resolving to LOAs with pagination info
     */
    getLOAs(params?: PaginationParams): Promise<LOAListResponse>;
    /**
     * Retrieve a specific LOA by ID
     * @param loaId - The LOA ID
     * @returns Promise resolving to the LOA data
     */
    getLOA(loaId: string): Promise<LOAAPIResponse>;
    /**
     * Retrieve LOAs for a specific member
     * @param memberId - The member ID
     * @param params - Pagination parameters
     * @returns Promise resolving to member's LOAs
     */
    getUserLOAs(memberId: string, params?: PaginationParams): Promise<LOAListResponse>;
    /**
     * Retrieve a paginated list of logs
     * @param params - Pagination parameters
     * @returns Promise resolving to logs with pagination info
     */
    getLogs(params?: PaginationParams): Promise<LogListResponse>;
    /**
     * Retrieve a specific log by ID
     * @param logId - The log ID
     * @returns Promise resolving to the log data
     */
    getLog(logId: string): Promise<LogAPIResponse>;
    /**
     * Retrieve logs created by a specific staff member
     * @param staffId - The staff member ID
     * @param params - Pagination parameters
     * @returns Promise resolving to staff member's logs
     */
    getStaffLogs(staffId: string, params?: PaginationParams): Promise<LogListResponse>;
    /**
     * Retrieve logs for a specific user
     * @param username - The username
     * @param params - Pagination parameters
     * @returns Promise resolving to user's logs
     */
    getUserLogs(username: string, params?: PaginationParams): Promise<LogListResponse>;
    /**
     * Retrieve a paginated list of server members
     * @param params - Pagination parameters
     * @returns Promise resolving to members with pagination info
     */
    getMembers(params?: PaginationParams): Promise<MemberListResponse>;
    /**
     * Retrieve a specific member by ID
     * @param memberId - The member ID
     * @returns Promise resolving to the member data
     */
    getMember(memberId: string): Promise<MemberAPIResponse>;
    /**
     * Retrieve a member by their Discord ID
     * @param discordId - The Discord user ID
     * @returns Promise resolving to the member data
     */
    getMemberByDiscordId(discordId: string): Promise<MemberAPIResponse>;
    /**
     * Retrieve a paginated list of roles
     * @param params - Pagination parameters
     * @returns Promise resolving to roles with pagination info
     */
    getRoles(params?: PaginationParams): Promise<RoleListResponse>;
    /**
     * Retrieve a specific role by ID
     * @param roleId - The role ID
     * @returns Promise resolving to the role data
     */
    getRole(roleId: string): Promise<RoleAPIResponse>;
    /**
     * Retrieve a paginated list of shifts
     * @param params - Pagination parameters
     * @returns Promise resolving to shifts with pagination info
     */
    getShifts(params?: PaginationParams): Promise<ShiftListResponse>;
    /**
     * Retrieve a specific shift by ID
     * @param shiftId - The shift ID
     * @returns Promise resolving to the shift data
     */
    getShift(shiftId: string): Promise<ShiftAPIResponse>;
}

/**
 * Base error class for all Melonly API errors
 */
declare class MelonlyError extends Error {
    readonly status: number;
    readonly details?: unknown;
    readonly name: string;
    readonly timestamp: string;
    constructor(status: number, message: string, details?: unknown);
    /**
     * Convert error to JSON for logging/debugging
     */
    toJSON(): Record<string, unknown>;
}
/**
 * Network-related errors (timeouts, connection issues, etc.)
 */
declare class NetworkError extends Error {
    readonly cause?: Error | undefined;
    readonly name = "NetworkError";
    readonly timestamp: string;
    constructor(message: string, cause?: Error | undefined);
    toJSON(): Record<string, unknown>;
}
/**
 * Rate limiting errors with retry information
 */
declare class RateLimitError extends MelonlyError {
    readonly retryAfterSeconds?: number | undefined;
    readonly resetTimestamp?: number | undefined;
    readonly name: string;
    constructor(message: string, retryAfterSeconds?: number | undefined, resetTimestamp?: number | undefined);
    /**
     * Get the time when the rate limit resets
     */
    get resetDate(): Date | undefined;
    /**
     * Get milliseconds until rate limit reset
     */
    get millisecondsUntilReset(): number | undefined;
    toJSON(): Record<string, unknown>;
}
/**
 * Validation errors for invalid input parameters
 */
declare class ValidationError extends Error {
    readonly field?: string | undefined;
    readonly value?: unknown;
    readonly name = "ValidationError";
    readonly timestamp: string;
    constructor(message: string, field?: string | undefined, value?: unknown);
    toJSON(): Record<string, unknown>;
}

export { type APIResponse, type ApplicationAPIResponse, type ApplicationListResponse, type ApplicationResponseAPIResponse, type ApplicationResponseListResponse, type AuditLogEventAPIResponse, type AuditLogListResponse, type BadRequestResponse, type ClientOptions, type ErrorResponse, type ErrorResponseType, type InternalServerErrorResponse, type JoinRequestAPIResponse, type JoinRequestListResponse, type LOAAPIResponse, type LOAListResponse, type ListResponse, type LogAPIResponse, type LogListResponse, MelonlyClient, MelonlyError, type MemberAPIResponse, type MemberListResponse, NetworkError, type NotFoundResponse, type PaginatedResponse, type PaginationMeta, RateLimitError, type RoleAPIResponse, type RoleListResponse, type ServerAPIResponse, type ShiftAPIResponse, type ShiftListResponse, type UnauthorizedResponse, ValidationError };
