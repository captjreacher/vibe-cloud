/**
 * Centralized API types for the FE bundle.
 * - All `worker/*` and `shared/*` symbols are exported as TYPES ONLY so the client build never loads Worker code.
 * - Minimal browser-safe shims are provided where runtime values are expected (image attachment helpers).
 */

// ---------- TYPE-ONLY RE-EXPORTS (no runtime imports) ----------

// Auth/session types
export type { SessionResponse } from 'worker/utils/authUtils';

// Secrets API Types
export type { SecretTemplate } from 'worker/types/secretsTemplates';

// Base API Response Types
export type { ControllerResponse, ApiResponse } from 'worker/api/controllers/types';

// Database Types
export type {
  PaginationInfo,
  EnhancedAppData,
  AppWithFavoriteStatus,
  TimePeriod,
  AppSortOption,
  SortOrder,
  AppQueryOptions,
  PublicAppQueryOptions,
  FavoriteToggleResult,
  UserStats,
  UserActivity,
  EncryptedSecret,
  UserModelConfigWithMetadata,
  ModelTestResult,
} from 'worker/database/types';

// App-related API Types
export type {
  AppsListData,
  PublicAppsData,
  SingleAppData,
  FavoriteToggleData,
  CreateAppData,
  UpdateAppVisibilityData,
  AppDeleteData,
  AppWithUserAndStats,
} from 'worker/api/controllers/apps/types';

export type {
  AppDetailsData,
  AppStarToggleData,
  GeneratedCodeFile,
} from 'worker/api/controllers/appView/types';

// User-related API Types
export type {
  UserAppsData,
  ProfileUpdateData,
} from 'worker/api/controllers/user/types';

// Stats API Types
export type {
  UserStatsData,
  UserActivityData,
} from 'worker/api/controllers/stats/types';

// Analytics API Types
export type {
  UserAnalyticsResponseData,
  AgentAnalyticsResponseData,
} from 'worker/api/controllers/analytics/types';

export type { PlatformStatusData } from 'worker/api/controllers/status/types';

// Model Config API Types
export type {
  ModelConfigsData,
  ModelConfigData,
  ModelConfigUpdateData,
  ModelConfigTestData,
  ModelConfigResetData,
  ModelConfigDefaultsData,
  ModelConfigDeleteData,
  ByokProvidersData,
  UserProviderStatus,
  ModelsByProvider,
} from 'worker/api/controllers/modelConfig/types';

// Model Provider API Types
export type {
  ModelProvidersListData,
  ModelProviderData,
  ModelProviderCreateData,
  ModelProviderUpdateData,
  ModelProviderDeleteData,
  ModelProviderTestData,
  CreateProviderRequest,
  UpdateProviderRequest,
  TestProviderRequest,
} from 'worker/api/controllers/modelProviders/types';

// Database/Schema Types commonly used in frontend
export type {
  App,
  User,
  UserModelConfig,
  UserModelProvider,
} from 'worker/database/schema';

// Agent/Generator Types
export type {
  Blueprint as BlueprintType,
  ClientReportedErrorType,
  CodeReviewOutputType,
  FileConceptType,
  FileOutputType as GeneratedFile,
} from 'worker/agents/schemas';

export type { CodeGenState } from 'worker/agents/core/state';

export type { ConversationMessage } from 'worker/agents/inferutils/common';

export type {
  RuntimeError,
  StaticAnalysisResponse,
} from 'worker/services/sandbox/sandboxTypes';

// Config/Inference Types
export type {
  AgentActionKey,
  AgentConfig,
  ModelConfig,
  ReasoningEffortType as ReasoningEffort,
  ProviderOverrideType as ProviderOverride,
  AIModels,
} from 'worker/agents/inferutils/config.types';

// Rate limit / responses / agent
export type { RateLimitError } from 'worker/services/rate-limit/errors';
export type { AgentPreviewResponse, CodeGenArgs } from 'worker/api/controllers/agent/types';
export type { RateLimitErrorResponse } from 'worker/api/responses';

// Error types (types-only)
export type {
  RateLimitExceededError,
  SecurityError,
  SecurityErrorType,
} from 'shared/types/errors';

// Auth types imported from worker (types-only)
export type {
  AuthSession,
  ApiKeyInfo,
  AuthResult,
  AuthUser,
  OAuthProvider,
} from 'worker/types/auth-types';

// GitHub export types
export type {
  GitHubExportOptions,
  GitHubExportResult,
} from 'worker/services/github/types';

// Frontend model config update interface that matches backend schema
export interface ModelConfigUpdate {
  modelName?: string | null;
  maxTokens?: number | null;
  temperature?: number | null;
  reasoningEffort?: string | null;
  fallbackModel?: string | null;
  isUserOverride?: boolean;
}

// Model selection types
export type ModelSelectionMode = 'platform' | 'byok' | 'custom';

// Match chat FileType interface
export interface FileType {
  filePath: string;
  fileContents: string;
  explanation?: string;
  isGenerating?: boolean;
  needsFixing?: boolean;
  hasErrors?: boolean;
  language?: string;
}

// Streaming response wrapper types for agent session creation
export interface StreamingResponse {
  success: boolean;
  stream: Response;
}
export type AgentStreamingResponse = StreamingResponse;

// ---------- IMAGE ATTACHMENT: client-safe shims ----------
// If your UI needs these at runtime, keep these shims.
// Replace the values to mirror your Worker defaults if required.

export type { ImageAttachment } from 'worker/types/image-attachment';

// Browser-side defaults (adjust to match server if needed)
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB (update if your Worker differs)
export const MAX_IMAGES_PER_MESSAGE = 4;              // update to match Worker
export const SUPPORTED_IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
] as const;

export function isSupportedImageType(mime: string): boolean {
  return SUPPORTED_IMAGE_MIME_TYPES.includes(mime as (typeof SUPPORTED_IMAGE_MIME_TYPES)[number]);
}
