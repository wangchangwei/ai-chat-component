import type { UIAction } from "../core/schema/base.js";

/**
 * Shape used by the Examples page to display a complete worked flow.
 */
export interface ExampleFlow {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  userSays: string;
  schema: UIAction;
}
