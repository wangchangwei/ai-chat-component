import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { CardProps, CardValue } from "../../core/schema/card.js";
/**
 * Card — list of structured items. When `selectable`, lets the user pick one
 * (or many when `multi`).
 */
export declare function CardView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<CardProps, CardValue>): React.JSX.Element;
