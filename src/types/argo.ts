export interface ArgoApplication {
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: Spec;
  status: Status;
}

interface Metadata {
  annotations?: Record<string, string>;
  creationTimestamp: string;
  generation: number;
  labels: Record<string, string>;
  managedFields: ManagedField[];
  name: string;
  namespace: string;
  resourceVersion: string;
  uid: string;
}

interface ManagedField {
  apiVersion: string;
  fieldsType: string;
  fieldsV1: FieldsV1;
  manager: string;
  operation: string;
  time: string;
}

interface FieldsV1 {
  [key: string]: any; // Dynamic structure, can be further refined if needed
}

interface Spec {
  destination: Destination;
  project: string;
  source: Source;
  syncPolicy: SyncPolicy;
}

interface Destination {
  namespace: string;
  server: string;
}

interface Source {
  path: string;
  repoURL: string;
  targetRevision: string;
}

interface SyncPolicy {
  automated: Automated;
  syncOptions: string[];
}

interface Automated {
  selfHeal: boolean;
}

interface Status {
  controllerNamespace: string;
  health: Health;
  history: History[];
  operationState: OperationState;
  reconciledAt: string;
  resources: Resource[];
  sourceType: string;
  summary: Record<string, any>;
  sync: Sync;
}

interface Health {
  status: string;
  message?: string;
}

interface History {
  deployStartedAt: string;
  deployedAt: string;
  id: number;
  initiatedBy: InitiatedBy;
  revision: string;
  source: Source;
}

interface InitiatedBy {
  username?: string;
  automated?: boolean;
}

interface OperationState {
  finishedAt: string;
  message: string;
  operation: Operation;
  phase: string;
  startedAt: string;
  syncResult: SyncResult;
}

interface Operation {
  initiatedBy: InitiatedBy;
  retry: Record<string, any>;
  sync: SyncOperation;
}

interface SyncOperation {
  prune: boolean;
  revision: string;
  syncOptions: string[];
  syncStrategy: SyncStrategy;
}

interface SyncStrategy {
  hook: Record<string, any>;
}

interface SyncResult {
  resources: SyncResource[];
  revision: string;
  source: Source;
}

interface SyncResource {
  group?: string;
  hookPhase: string;
  kind: string;
  message: string;
  name: string;
  namespace: string;
  status: string;
  syncPhase: string;
  version: string;
}

interface Resource {
  group?: string;
  kind: string;
  name: string;
  namespace: string;
  requiresPruning?: boolean;
  status: string;
  version: string;
  health?: Health;
}

interface Sync {
  comparedTo: ComparedTo;
  revision: string;
  status: string;
}

interface ComparedTo {
  destination: Destination;
  source: Source;
}
