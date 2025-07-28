/**
 * Auto-generated and enhanced types for Melonly API
 * Generated: 2025-07-28
 */

// === Base Response Types ===

/**
 * Standard pagination metadata included in list responses
 */
export interface PaginationMeta {
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
export interface PaginatedResponse<T> extends PaginationMeta {
  /** Array of data items for current page */
  data: T[];
}

// === Error Response Types ===

/**
 * Standard error response format
 */
export interface ErrorResponse {
  /** Error message describing what went wrong */
  error: string;
}

/**
 * Bad request error (400)
 */
export interface BadRequestResponse extends ErrorResponse {}

/**
 * Unauthorized error (401)
 */
export interface UnauthorizedResponse extends ErrorResponse {}

/**
 * Not found error (404)
 */
export interface NotFoundResponse extends ErrorResponse {}

/**
 * Internal server error (500)
 */
export interface InternalServerErrorResponse extends ErrorResponse {}

// === Application Types ===

/**
 * Application configuration and metadata
 */
export interface ApplicationAPIResponse {
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
export interface ApplicationListResponse
  extends PaginatedResponse<ApplicationAPIResponse> {}

/**
 * Application response/submission data
 */
export interface ApplicationResponseAPIResponse {
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
export interface ApplicationResponseListResponse
  extends PaginatedResponse<ApplicationResponseAPIResponse> {}

// === Audit Log Types ===

/**
 * Audit log event entry
 */
export interface AuditLogEventAPIResponse {
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
export interface AuditLogListResponse
  extends PaginatedResponse<AuditLogEventAPIResponse> {}

// === Join Request Types ===

/**
 * Server join request data
 */
export interface JoinRequestAPIResponse {
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
export interface JoinRequestListResponse
  extends PaginatedResponse<JoinRequestAPIResponse> {}

// === LOA (Leave of Absence) Types ===

/**
 * Leave of Absence record
 */
export interface LOAAPIResponse {
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
export interface LOAListResponse extends PaginatedResponse<LOAAPIResponse> {}

// === Log Types ===

/**
 * Moderation log entry
 */
export interface LogAPIResponse {
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
export interface LogListResponse extends PaginatedResponse<LogAPIResponse> {}

// === Member Types ===

/**
 * Server member data
 */
export interface MemberAPIResponse {
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
export interface MemberListResponse
  extends PaginatedResponse<MemberAPIResponse> {}

// === Role Types ===

/**
 * Server role configuration
 */
export interface RoleAPIResponse {
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
export interface RoleListResponse extends PaginatedResponse<RoleAPIResponse> {}

// === Server Types ===

/**
 * Server information and configuration
 */
export interface ServerAPIResponse {
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

// === Shift Types ===

/**
 * Work shift record
 */
export interface ShiftAPIResponse {
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
export interface ShiftListResponse
  extends PaginatedResponse<ShiftAPIResponse> {}

// === Utility Types ===

/**
 * Union type of all possible API response types
 */
export type APIResponse =
  | ApplicationAPIResponse
  | ApplicationResponseAPIResponse
  | AuditLogEventAPIResponse
  | JoinRequestAPIResponse
  | LOAAPIResponse
  | LogAPIResponse
  | MemberAPIResponse
  | RoleAPIResponse
  | ServerAPIResponse
  | ShiftAPIResponse;

/**
 * Union type of all possible list response types
 */
export type ListResponse =
  | ApplicationListResponse
  | ApplicationResponseListResponse
  | AuditLogListResponse
  | JoinRequestListResponse
  | LOAListResponse
  | LogListResponse
  | MemberListResponse
  | RoleListResponse
  | ShiftListResponse;

/**
 * Union type of all possible error response types
 */
export type ErrorResponseType =
  | BadRequestResponse
  | UnauthorizedResponse
  | NotFoundResponse
  | InternalServerErrorResponse;
