export interface ScheduledAction {
  id?: string;
  title: string;
  content: string;
  executionTime: string;
  executed?: boolean;
  executedAt?: string;
}
