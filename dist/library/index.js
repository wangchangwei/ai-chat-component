import { z as e } from "zod";
import * as t from "react";
import { useCallback as n, useMemo as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { clsx as c } from "clsx";
import { twMerge as l } from "tailwind-merge";
//#region src/packages/core/schema/base.ts
var u = e.object({
	label: e.string(),
	value: e.string(),
	description: e.string().optional(),
	disabled: e.boolean().optional()
});
function d(e) {
	return e;
}
//#endregion
//#region src/packages/core/schema/radio.ts
var f = e.object({
	title: e.string(),
	description: e.string().optional(),
	options: e.array(u).min(2),
	defaultValue: e.string().optional(),
	required: e.boolean().optional(),
	submitLabel: e.string().optional()
}), p = e.string(), m = e.object({
	title: e.string(),
	description: e.string().optional(),
	options: e.array(u).min(1),
	defaultValue: e.array(e.string()).optional(),
	min: e.number().int().nonnegative().optional(),
	max: e.number().int().positive().optional(),
	required: e.boolean().optional()
}), h = e.array(e.string()), g = e.object({
	title: e.string(),
	description: e.string().optional(),
	options: e.array(u).min(1),
	defaultValue: e.string().optional(),
	placeholder: e.string().optional(),
	searchable: e.boolean().optional(),
	required: e.boolean().optional()
}), _ = e.string(), v = e.object({
	type: e.literal("input"),
	name: e.string(),
	label: e.string(),
	placeholder: e.string().optional(),
	defaultValue: e.string().optional(),
	required: e.boolean().optional()
}), y = e.object({
	type: e.literal("textarea"),
	name: e.string(),
	label: e.string(),
	placeholder: e.string().optional(),
	defaultValue: e.string().optional(),
	required: e.boolean().optional(),
	rows: e.number().int().positive().optional()
}), ee = e.object({
	type: e.literal("number"),
	name: e.string(),
	label: e.string(),
	defaultValue: e.number().optional(),
	min: e.number().optional(),
	max: e.number().optional(),
	step: e.number().optional(),
	required: e.boolean().optional()
}), te = e.object({
	type: e.literal("switch"),
	name: e.string(),
	label: e.string(),
	description: e.string().optional(),
	defaultValue: e.boolean().optional()
}), ne = e.object({
	type: e.literal("radio"),
	name: e.string(),
	label: e.string(),
	options: e.array(e.object({
		label: e.string(),
		value: e.string()
	})).min(2),
	defaultValue: e.string().optional(),
	required: e.boolean().optional()
}), re = e.object({
	type: e.literal("checkbox"),
	name: e.string(),
	label: e.string(),
	options: e.array(e.object({
		label: e.string(),
		value: e.string()
	})).min(1),
	defaultValue: e.array(e.string()).optional()
}), ie = e.object({
	type: e.literal("select"),
	name: e.string(),
	label: e.string(),
	options: e.array(e.object({
		label: e.string(),
		value: e.string()
	})).min(1),
	defaultValue: e.string().optional(),
	placeholder: e.string().optional(),
	required: e.boolean().optional()
}), b = e.discriminatedUnion("type", [
	v,
	y,
	ee,
	te,
	ne,
	re,
	ie
]), x = e.object({
	title: e.string(),
	description: e.string().optional(),
	fields: e.array(b).min(1),
	submitLabel: e.string().optional(),
	cancelLabel: e.string().optional()
}), ae = e.record(e.string(), e.unknown()), S = e.object({
	title: e.string(),
	description: e.string().optional(),
	confirmLabel: e.string().optional(),
	cancelLabel: e.string().optional(),
	variant: e.enum(["default", "destructive"]).optional()
}), oe = e.boolean(), C = e.object({
	id: e.string(),
	title: e.string(),
	description: e.string().optional(),
	fields: e.array(b).min(1)
}), w = e.object({
	title: e.string(),
	description: e.string().optional(),
	steps: e.array(C).min(1),
	allowSkip: e.boolean().optional(),
	submitLabel: e.string().optional()
}), se = e.object({
	currentStep: e.number().int().nonnegative(),
	values: e.record(e.string(), e.unknown())
}), ce = e.string().url().refine((e) => {
	let t = e.toLowerCase();
	return t.startsWith("https://") || t.startsWith("http://") ? !0 : /^data:image\/(png|jpe?g|gif|webp);/.test(t);
}, { message: "image must be http(s) or a raster data URI" }), le = e.object({
	id: e.string(),
	title: e.string(),
	description: e.string().optional(),
	image: ce.optional(),
	meta: e.record(e.string(), e.union([
		e.string(),
		e.number(),
		e.boolean()
	])).optional()
}), ue = e.object({
	title: e.string(),
	description: e.string().optional(),
	items: e.array(le).min(1),
	selectable: e.boolean().optional(),
	multi: e.boolean().optional()
}), de = e.union([e.string(), e.array(e.string())]), fe = e.object({
	key: e.string(),
	label: e.string(),
	type: e.enum([
		"string",
		"number",
		"boolean",
		"date"
	]).optional()
}), pe = e.record(e.string(), e.union([
	e.string(),
	e.number(),
	e.boolean(),
	e.null()
])).and(e.object({ id: e.string() })), T = e.object({
	title: e.string(),
	description: e.string().optional(),
	columns: e.array(fe).min(1),
	rows: e.array(pe),
	rowSelection: e.enum([
		"none",
		"single",
		"multiple"
	]).optional(),
	pageSize: e.number().int().positive().optional()
}), me = e.union([e.string(), e.array(e.string())]), E = e.object({
	title: e.string(),
	description: e.string().optional(),
	accept: e.string().optional(),
	multiple: e.boolean().optional(),
	maxSize: e.number().int().positive().optional(),
	required: e.boolean().optional()
}), D = e.object({
	name: e.string(),
	size: e.number().int().nonnegative(),
	type: e.string(),
	dataUri: e.string().optional()
}), he = e.array(D), O = /* @__PURE__ */ new Map();
function k(e, t) {
	O.set(e, t);
}
function A(e) {
	return O.get(e);
}
function ge() {
	return Array.from(O.keys());
}
function _e(e) {
	return O.delete(e);
}
function ve() {
	O.clear();
}
//#endregion
//#region src/packages/core/renderer/UIRenderer.tsx
function j(e) {
	let { schema: t, onSubmit: n, onCancel: a, className: s, initialValue: c } = e, l = A(t.component), u = r(() => {
		if (!l) return {
			ok: !1,
			error: `Unknown component "${t.component}". Register it with registerComponent().`
		};
		let e = l.schema.safeParse(t.props);
		return e.success ? {
			ok: !0,
			props: e.data
		} : {
			ok: !1,
			error: `Invalid props for "${t.component}": ${e.error.message}`
		};
	}, [
		l,
		t.component,
		t.props
	]), [d, f] = i(c ?? l?.defaultValue);
	if (!u.ok) return /* @__PURE__ */ o(M, {
		message: u.error,
		className: s
	});
	if (!l) return /* @__PURE__ */ o(M, {
		message: "Component not found",
		className: s
	});
	let p = l.component;
	return /* @__PURE__ */ o("div", {
		"data-aui-component": t.component,
		"data-aui-id": t.id,
		className: s,
		children: /* @__PURE__ */ o(p, {
			props: u.props,
			value: d,
			onChange: (e) => f(e),
			onSubmit: (e) => n?.(e),
			onCancel: () => a?.()
		})
	});
}
function M({ message: e, className: t }) {
	return /* @__PURE__ */ s("div", {
		role: "alert",
		className: "rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive " + (t ?? ""),
		children: [/* @__PURE__ */ o("div", {
			className: "font-semibold mb-1",
			children: "UI schema error"
		}), /* @__PURE__ */ o("div", {
			className: "opacity-80",
			children: e
		})]
	});
}
//#endregion
//#region src/packages/core/hooks/useUIResult.tsx
function ye() {
	let [e, t] = i(null), [r, a] = i(null), [s, c] = i(!1);
	return {
		schema: e,
		setSchema: n((e) => {
			t(e), a(null), c(!1);
		}, []),
		result: r,
		cancelled: s,
		reset: n(() => {
			t(null), a(null), c(!1);
		}, []),
		ResultView: n((t) => e ? /* @__PURE__ */ o(j, {
			schema: e,
			onSubmit: (e) => {
				a(e), t.onSubmit?.(e);
			},
			onCancel: () => {
				c(!0), t.onCancel?.();
			},
			className: t.className,
			initialValue: t.initialValue
		}) : null, [e])
	};
}
//#endregion
//#region src/lib/utils.ts
function N(...e) {
	return l(c(e));
}
//#endregion
//#region src/packages/components/ui/RadioGroup.tsx
var P = t.forwardRef(({ value: e, onChange: n, options: r, name: i, id: a }, c) => {
	let l = i ?? `radio-${t.useId()}`;
	return /* @__PURE__ */ o("div", {
		ref: c,
		id: a,
		role: "radiogroup",
		className: "flex flex-col gap-2",
		children: r.map((t) => {
			let r = `${l}-${t.value}`, i = e === t.value;
			return /* @__PURE__ */ s("label", {
				htmlFor: r,
				className: N("flex items-start gap-3 rounded-md border border-input p-3 cursor-pointer transition-colors", "hover:bg-accent/50", i && "border-primary bg-primary/5", t.disabled && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ o("input", {
					id: r,
					type: "radio",
					name: l,
					value: t.value,
					checked: i,
					disabled: t.disabled,
					onChange: () => n(t.value),
					className: "mt-0.5 h-4 w-4 cursor-pointer accent-primary"
				}), /* @__PURE__ */ s("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ o("div", {
						className: "text-sm font-medium leading-none",
						children: t.label
					}), t.description && /* @__PURE__ */ o("div", {
						className: "text-xs text-muted-foreground mt-1",
						children: t.description
					})]
				})]
			}, t.value);
		})
	});
});
P.displayName = "RadioGroup";
//#endregion
//#region src/packages/components/ui/Button.tsx
var be = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", xe = {
	default: "bg-primary text-primary-foreground hover:opacity-90",
	secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
	outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
}, Se = {
	default: "h-9 px-4 py-2",
	sm: "h-8 px-3 text-xs",
	lg: "h-10 px-6",
	icon: "h-9 w-9 p-0"
}, F = t.forwardRef(({ className: e, variant: t = "default", size: n = "default", type: r = "button", ...i }, a) => /* @__PURE__ */ o("button", {
	ref: a,
	type: r,
	className: N(be, xe[t], Se[n], e),
	...i
}));
F.displayName = "Button";
//#endregion
//#region src/packages/components/Radio/Radio.tsx
function I({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let [c, l] = t.useState(n ?? e.defaultValue), u = !!e.submitLabel;
	function d(e) {
		l(e), r(e), u || i(e);
	}
	return /* @__PURE__ */ s("section", {
		className: "aui-radio rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ o(P, {
				value: c,
				onChange: d,
				options: e.options
			}),
			/* @__PURE__ */ s("footer", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ o("button", {
					type: "button",
					className: "text-xs text-muted-foreground hover:underline",
					onClick: a,
					children: "Cancel"
				}), u && /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: () => c && i(c),
					disabled: !c,
					children: e.submitLabel
				})]
			})
		]
	});
}
//#endregion
//#region src/packages/components/ui/Checkbox.tsx
var L = t.forwardRef(({ checked: e, onCheckedChange: t, disabled: n, id: r, ...i }, a) => /* @__PURE__ */ o("button", {
	ref: a,
	id: r,
	role: "checkbox",
	"aria-checked": e,
	disabled: n,
	onClick: () => t(!e),
	className: N("peer inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-primary", "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", e ? "bg-primary text-primary-foreground" : "bg-background"),
	...i,
	children: e && /* @__PURE__ */ o("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "3",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ o("polyline", { points: "20 6 9 17 4 12" })
	})
}));
L.displayName = "Checkbox";
//#endregion
//#region src/packages/components/ui/Label.tsx
var R = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("label", {
	ref: n,
	className: N("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", e),
	...t
}));
R.displayName = "Label";
//#endregion
//#region src/packages/components/Checkbox/Checkbox.tsx
function z({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let [c, l] = t.useState(n ?? e.defaultValue ?? []);
	function u(e, t) {
		let n = t ? Array.from(new Set([...c, e])) : c.filter((t) => t !== e);
		l(n), r(n);
	}
	let d = e.min ?? 0, f = e.max ?? e.options.length, p = c.length >= d && c.length <= f;
	function m() {
		p && i(c);
	}
	return /* @__PURE__ */ s("section", {
		className: "aui-checkbox rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ o("h3", {
						className: "text-base font-semibold leading-none",
						children: e.title
					}),
					e.description && /* @__PURE__ */ o("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: e.description
					}),
					(d > 0 || f < e.options.length) && /* @__PURE__ */ s("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							"Choose ",
							d === f ? d : `${d}–${f}`,
							" option",
							f === 1 ? "" : "s",
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ o("div", {
				className: "flex flex-col gap-2",
				children: e.options.map((e) => {
					let t = c.includes(e.value), n = `cb-${e.value}`;
					return /* @__PURE__ */ s("label", {
						htmlFor: n,
						className: N("flex items-start gap-3 rounded-md border border-input p-3 cursor-pointer transition-colors", "hover:bg-accent/50", t && "border-primary bg-primary/5"),
						children: [/* @__PURE__ */ o(L, {
							id: n,
							checked: t,
							onCheckedChange: (t) => u(e.value, t),
							"aria-label": e.label
						}), /* @__PURE__ */ s("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ o(R, {
								htmlFor: n,
								className: "cursor-pointer",
								children: e.label
							}), e.description && /* @__PURE__ */ o("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: e.description
							})]
						})]
					}, e.value);
				})
			}),
			/* @__PURE__ */ s("footer", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ o(F, {
					variant: "ghost",
					size: "sm",
					onClick: a,
					children: "Cancel"
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: m,
					disabled: !p,
					children: "Submit"
				})]
			})
		]
	});
}
//#endregion
//#region src/packages/components/ui/Select.tsx
var B = t.forwardRef(({ value: e, onChange: t, options: n, placeholder: r, disabled: i, id: a }, c) => /* @__PURE__ */ s("select", {
	ref: c,
	id: a,
	value: e ?? "",
	disabled: i,
	onChange: (e) => t(e.target.value),
	className: N("flex h-9 w-full items-center rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50"),
	children: [r && /* @__PURE__ */ o("option", {
		value: "",
		disabled: !0,
		children: r
	}), n.map((e) => /* @__PURE__ */ o("option", {
		value: e.value,
		disabled: e.disabled,
		children: e.label
	}, e.value))]
}));
B.displayName = "Select";
//#endregion
//#region src/packages/components/Select/Select.tsx
function V({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let [c, l] = t.useState(n ?? e.defaultValue), u = t.useId();
	function d(e) {
		l(e), r(e);
	}
	let f = !e.required || !!c;
	return /* @__PURE__ */ s("section", {
		className: "aui-select rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ s("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ o(R, {
					htmlFor: u,
					children: "Value"
				}), /* @__PURE__ */ o(B, {
					id: u,
					value: c,
					onChange: d,
					options: e.options,
					placeholder: e.placeholder ?? "Select an option"
				})]
			}),
			/* @__PURE__ */ s("footer", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ o(F, {
					variant: "ghost",
					size: "sm",
					onClick: a,
					children: "Cancel"
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: () => c && i(c),
					disabled: !f || !c,
					children: "Submit"
				})]
			})
		]
	});
}
//#endregion
//#region src/packages/components/ui/Input.tsx
var H = t.forwardRef(({ className: e, type: t = "text", ...n }, r) => /* @__PURE__ */ o("input", {
	ref: r,
	type: t,
	className: N("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm", "transition-colors placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", e),
	...n
}));
H.displayName = "Input";
//#endregion
//#region src/packages/components/ui/Textarea.tsx
var U = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("textarea", {
	ref: n,
	className: N("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm", "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", e),
	...t
}));
U.displayName = "Textarea";
//#endregion
//#region src/packages/components/ui/Switch.tsx
var W = t.forwardRef(({ checked: e, onCheckedChange: t, disabled: n, id: r, ...i }, a) => /* @__PURE__ */ o("button", {
	ref: a,
	id: r,
	role: "switch",
	"aria-checked": e,
	disabled: n,
	onClick: () => t(!e),
	className: N("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent", "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", e ? "bg-primary" : "bg-input"),
	...i,
	children: /* @__PURE__ */ o("span", {
		"aria-hidden": "true",
		className: N("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform", e ? "translate-x-4" : "translate-x-0")
	})
}));
W.displayName = "Switch";
//#endregion
//#region src/packages/components/Form/Form.tsx
function Ce(e) {
	if ("defaultValue" in e && e.defaultValue !== void 0) return e.defaultValue;
	switch (e.type) {
		case "checkbox": return [];
		case "switch": return !1;
		case "number": return "";
		default: return "";
	}
}
function G({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let [c, l] = t.useState(() => {
		let t = {};
		for (let r of e.fields) t[r.name] = n && n[r.name] !== void 0 ? n[r.name] : Ce(r);
		return t;
	});
	function u(e, t) {
		let n = {
			...c,
			[e]: t
		};
		l(n), r(n);
	}
	function d() {
		for (let t of e.fields) if ("required" in t && t.required) {
			let e = c[t.name];
			if (e === "" || e == null) return;
		}
		i(c);
	}
	return /* @__PURE__ */ s("section", {
		className: "aui-form rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "space-y-4",
				children: e.fields.map((e) => {
					let t = `field-${e.name}`;
					return /* @__PURE__ */ s("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ s(R, {
							htmlFor: t,
							children: [e.label, "required" in e && e.required && /* @__PURE__ */ o("span", {
								className: "text-destructive ml-1",
								children: "*"
							})]
						}), /* @__PURE__ */ o(we, {
							field: e,
							id: t,
							value: c[e.name],
							onChange: (t) => u(e.name, t)
						})]
					}, e.name);
				})
			}),
			/* @__PURE__ */ s("footer", {
				className: "mt-6 flex justify-end gap-2",
				children: [/* @__PURE__ */ o(F, {
					variant: "ghost",
					size: "sm",
					onClick: a,
					children: e.cancelLabel ?? "Cancel"
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: d,
					children: e.submitLabel ?? "Submit"
				})]
			})
		]
	});
}
function we({ field: e, id: t, value: n, onChange: r }) {
	switch (e.type) {
		case "input": return /* @__PURE__ */ o(H, {
			id: t,
			placeholder: e.placeholder,
			value: n ?? "",
			onChange: (e) => r(e.target.value),
			required: e.required
		});
		case "textarea": return /* @__PURE__ */ o(U, {
			id: t,
			rows: e.rows,
			placeholder: e.placeholder,
			value: n ?? "",
			onChange: (e) => r(e.target.value),
			required: e.required
		});
		case "number": return /* @__PURE__ */ o(H, {
			id: t,
			type: "number",
			min: e.min,
			max: e.max,
			step: e.step,
			value: n ?? "",
			onChange: (e) => r(e.target.value === "" ? "" : Number(e.target.value)),
			required: e.required
		});
		case "switch": return /* @__PURE__ */ s("div", {
			className: "flex items-center gap-3 pt-1",
			children: [/* @__PURE__ */ o(W, {
				id: t,
				checked: !!n,
				onCheckedChange: (e) => r(e)
			}), e.description && /* @__PURE__ */ o("span", {
				className: "text-xs text-muted-foreground",
				children: e.description
			})]
		});
		case "radio": return /* @__PURE__ */ o(P, {
			id: t,
			value: n ?? void 0,
			onChange: (e) => r(e),
			options: e.options
		});
		case "checkbox": {
			let t = Array.isArray(n) ? n : [];
			return /* @__PURE__ */ o("div", {
				className: "flex flex-col gap-2",
				children: e.options.map((e) => /* @__PURE__ */ s("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ o(L, {
						checked: t.includes(e.value),
						onCheckedChange: (n) => {
							r(n ? Array.from(new Set([...t, e.value])) : t.filter((t) => t !== e.value));
						},
						"aria-label": e.label
					}), e.label]
				}, e.value))
			});
		}
		case "select": return /* @__PURE__ */ o(B, {
			id: t,
			value: n ?? void 0,
			onChange: (e) => r(e),
			options: e.options,
			placeholder: e.placeholder
		});
	}
}
//#endregion
//#region src/packages/components/ui/Modal.tsx
function K({ open: e, onClose: n, title: r, description: i, children: a, footer: c, className: l }) {
	return t.useEffect(() => {
		if (!e) return;
		function t(e) {
			e.key === "Escape" && n();
		}
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e, n]), e ? /* @__PURE__ */ s("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": r,
		className: "fixed inset-0 z-50 flex items-center justify-center",
		children: [/* @__PURE__ */ o("div", {
			className: "fixed inset-0 bg-black/50",
			onClick: n,
			"aria-hidden": "true"
		}), /* @__PURE__ */ s("div", {
			onClick: (e) => e.stopPropagation(),
			className: N("relative z-10 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg", l),
			children: [
				r && /* @__PURE__ */ o("h2", {
					className: "text-lg font-semibold mb-1",
					children: r
				}),
				i && /* @__PURE__ */ o("p", {
					className: "text-sm text-muted-foreground mb-4",
					children: i
				}),
				a,
				c && /* @__PURE__ */ o("div", {
					className: "mt-6 flex justify-end gap-2",
					children: c
				})
			]
		})]
	}) : null;
}
//#endregion
//#region src/packages/components/Confirm/Confirm.tsx
function q({ props: e, onSubmit: t, onCancel: n }) {
	let r = e.variant === "destructive", i = e.confirmLabel ?? (r ? "Delete" : "Confirm"), c = e.cancelLabel ?? "Cancel";
	return /* @__PURE__ */ o("div", {
		className: "aui-confirm",
		children: /* @__PURE__ */ o(K, {
			open: !0,
			onClose: n,
			title: e.title,
			description: e.description,
			footer: /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(F, {
				variant: "ghost",
				onClick: n,
				children: c
			}), /* @__PURE__ */ o(F, {
				variant: r ? "destructive" : "default",
				onClick: () => t(!0),
				children: i
			})] })
		})
	});
}
//#endregion
//#region src/packages/components/Wizard/Wizard.tsx
function Te(e) {
	if ("defaultValue" in e && e.defaultValue !== void 0) return e.defaultValue;
	switch (e.type) {
		case "checkbox": return [];
		case "switch": return !1;
		default: return "";
	}
}
function Ee({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let c = Math.min(Math.max(n?.currentStep ?? 0, 0), Math.max(e.steps.length - 1, 0)), [l, u] = t.useState(c), [d, f] = t.useState(() => {
		let t = {};
		for (let r of e.steps) for (let e of r.fields) t[e.name] = n?.values?.[e.name] === void 0 ? Te(e) : n.values[e.name];
		return t;
	}), p = e.steps[l], m = l === e.steps.length - 1, h = l === 0;
	function g(e, t) {
		let n = {
			...d,
			[e]: t
		};
		f(n), r({
			currentStep: l,
			values: n
		});
	}
	function _() {
		if (m) i({
			currentStep: l,
			values: d
		});
		else {
			let e = l + 1;
			u(e), r({
				currentStep: e,
				values: d
			});
		}
	}
	function v() {
		if (!h) {
			let e = l - 1;
			u(e), r({
				currentStep: e,
				values: d
			});
		}
	}
	return /* @__PURE__ */ s("section", {
		className: "aui-wizard rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ o(De, {
				steps: e.steps,
				current: l
			}),
			/* @__PURE__ */ s("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ s("h4", {
						className: "text-sm font-semibold",
						children: [
							"Step ",
							l + 1,
							": ",
							p.title
						]
					}),
					p.description && /* @__PURE__ */ o("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: p.description
					}),
					/* @__PURE__ */ o("div", {
						className: "mt-3 space-y-4",
						children: p.fields.map((e) => {
							let t = `wiz-${e.name}`;
							return /* @__PURE__ */ s("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ o(R, {
									htmlFor: t,
									children: e.label
								}), /* @__PURE__ */ o(Oe, {
									field: e,
									id: t,
									value: d[e.name],
									onChange: (t) => g(e.name, t)
								})]
							}, e.name);
						})
					})
				]
			}),
			/* @__PURE__ */ s("footer", {
				className: "mt-6 flex justify-between gap-2",
				children: [/* @__PURE__ */ s("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ o(F, {
						variant: "ghost",
						size: "sm",
						onClick: a,
						children: "Cancel"
					}), !h && /* @__PURE__ */ o(F, {
						variant: "outline",
						size: "sm",
						onClick: v,
						children: "Back"
					})]
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: _,
					children: m ? e.submitLabel ?? "Finish" : "Next"
				})]
			})
		]
	});
}
function De({ steps: e, current: t }) {
	return /* @__PURE__ */ o("ol", {
		className: "mt-3 flex items-center gap-2 overflow-x-auto pb-1",
		children: e.map((n, r) => {
			let i = r === t, a = r < t;
			return /* @__PURE__ */ s("li", {
				className: N("flex items-center gap-2 text-xs whitespace-nowrap", i && "font-semibold"),
				children: [
					/* @__PURE__ */ o("span", {
						className: N("flex h-6 w-6 items-center justify-center rounded-full border", a && "bg-primary text-primary-foreground border-primary", i && !a && "border-primary", !i && !a && "border-input text-muted-foreground"),
						"aria-hidden": "true",
						children: r + 1
					}),
					/* @__PURE__ */ o("span", { children: n.title }),
					r < e.length - 1 && /* @__PURE__ */ o("span", {
						"aria-hidden": "true",
						className: "text-muted-foreground",
						children: "→"
					})
				]
			}, n.id);
		})
	});
}
function Oe({ field: e, id: t, value: n, onChange: r }) {
	switch (e.type) {
		case "input": return /* @__PURE__ */ o(H, {
			id: t,
			placeholder: e.placeholder,
			value: n ?? "",
			onChange: (e) => r(e.target.value),
			required: e.required
		});
		case "textarea": return /* @__PURE__ */ o(U, {
			id: t,
			rows: e.rows,
			placeholder: e.placeholder,
			value: n ?? "",
			onChange: (e) => r(e.target.value),
			required: e.required
		});
		case "number": return /* @__PURE__ */ o(H, {
			id: t,
			type: "number",
			min: e.min,
			max: e.max,
			step: e.step,
			value: n ?? "",
			onChange: (e) => r(e.target.value === "" ? "" : Number(e.target.value)),
			required: e.required
		});
		case "switch": return /* @__PURE__ */ s("div", {
			className: "flex items-center gap-3 pt-1",
			children: [/* @__PURE__ */ o(W, {
				id: t,
				checked: !!n,
				onCheckedChange: (e) => r(e)
			}), e.description && /* @__PURE__ */ o("span", {
				className: "text-xs text-muted-foreground",
				children: e.description
			})]
		});
		case "radio": return /* @__PURE__ */ o(P, {
			id: t,
			value: n ?? void 0,
			onChange: (e) => r(e),
			options: e.options
		});
		case "checkbox": {
			let t = Array.isArray(n) ? n : [];
			return /* @__PURE__ */ o("div", {
				className: "flex flex-col gap-2",
				children: e.options.map((e) => /* @__PURE__ */ s("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ o(L, {
						checked: t.includes(e.value),
						onCheckedChange: (n) => {
							r(n ? Array.from(new Set([...t, e.value])) : t.filter((t) => t !== e.value));
						},
						"aria-label": e.label
					}), e.label]
				}, e.value))
			});
		}
		case "select": return /* @__PURE__ */ o(B, {
			id: t,
			value: n ?? void 0,
			onChange: (e) => r(e),
			options: e.options,
			placeholder: e.placeholder
		});
	}
}
//#endregion
//#region src/packages/components/ui/Card.tsx
var J = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", {
	ref: n,
	className: N("rounded-lg border bg-card text-card-foreground shadow-sm", e),
	...t
}));
J.displayName = "Card";
var Y = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", {
	ref: n,
	className: N("flex flex-col gap-1.5 p-4", e),
	...t
}));
Y.displayName = "CardHeader";
var X = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", {
	ref: n,
	className: N("text-base font-semibold leading-none", e),
	...t
}));
X.displayName = "CardTitle";
var Z = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", {
	ref: n,
	className: N("text-sm text-muted-foreground", e),
	...t
}));
Z.displayName = "CardDescription";
var Q = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", {
	ref: n,
	className: N("p-4 pt-0", e),
	...t
}));
Q.displayName = "CardContent";
var ke = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ o("div", {
	ref: n,
	className: N("flex items-center p-4 pt-0 gap-2", e),
	...t
}));
ke.displayName = "CardFooter";
//#endregion
//#region src/packages/components/Card/Card.tsx
function Ae({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let c = e.selectable && e.multi, l = e.selectable && !e.multi, [u, d] = t.useState(n ?? void 0), [f, p] = t.useState(n ?? []);
	function m(e) {
		if (l) d(e), r(e), i(e);
		else if (c) {
			let t = f.includes(e) ? f.filter((t) => t !== e) : [...f, e];
			p(t), r(t);
		}
	}
	function h() {
		i(f);
	}
	return /* @__PURE__ */ s("section", {
		className: "aui-card rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: e.items.map((n) => {
					let r = l ? u === n.id : c ? f.includes(n.id) : !1;
					return /* @__PURE__ */ o("button", {
						type: "button",
						disabled: !e.selectable,
						onClick: () => e.selectable && m(n.id),
						className: N("text-left transition-all", e.selectable && "cursor-pointer hover:shadow-md", !e.selectable && "cursor-default"),
						children: /* @__PURE__ */ s(J, {
							className: N("h-full", r && "ring-2 ring-primary border-primary"),
							children: [
								n.image && /* @__PURE__ */ o("img", {
									src: n.image,
									alt: n.title,
									className: "aspect-video w-full rounded-t-lg object-cover bg-muted"
								}),
								/* @__PURE__ */ s(Y, { children: [/* @__PURE__ */ o(X, { children: n.title }), n.description && /* @__PURE__ */ o(Z, { children: n.description })] }),
								n.meta && Object.keys(n.meta).length > 0 && /* @__PURE__ */ o(Q, {
									className: "pt-0",
									children: /* @__PURE__ */ o("dl", {
										className: "grid grid-cols-2 gap-x-3 gap-y-1 text-xs",
										children: Object.entries(n.meta).map(([e, n]) => /* @__PURE__ */ s(t.Fragment, { children: [/* @__PURE__ */ o("dt", {
											className: "text-muted-foreground",
											children: e
										}), /* @__PURE__ */ o("dd", {
											className: "font-medium",
											children: String(n)
										})] }, e))
									})
								})
							]
						})
					}, n.id);
				})
			}),
			c && /* @__PURE__ */ s("footer", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ o(F, {
					variant: "ghost",
					size: "sm",
					onClick: a,
					children: "Cancel"
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: h,
					disabled: f.length === 0,
					children: "Submit"
				})]
			})
		]
	});
}
//#endregion
//#region src/packages/components/Table/Table.tsx
function je({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let c = e.rowSelection ?? "none", l = c === "multiple", u = c === "single", [d, f] = t.useState(n ?? void 0), [p, m] = t.useState(n ?? []);
	function h(e) {
		if (u) f(e), r(e), i(e);
		else if (l) {
			let t = p.includes(e) ? p.filter((t) => t !== e) : [...p, e];
			m(t), r(t);
		}
	}
	function g() {
		i(p);
	}
	return /* @__PURE__ */ s("section", {
		className: "aui-table rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ s("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ o("thead", { children: /* @__PURE__ */ s("tr", {
						className: "border-b text-left",
						children: [l && /* @__PURE__ */ o("th", { className: "w-8 py-2" }), e.columns.map((e) => /* @__PURE__ */ o("th", {
							className: "py-2 pr-4 font-medium text-muted-foreground",
							children: e.label
						}, e.key))]
					}) }), /* @__PURE__ */ s("tbody", { children: [e.rows.length === 0 && /* @__PURE__ */ o("tr", { children: /* @__PURE__ */ o("td", {
						colSpan: e.columns.length + +!!l,
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "No rows."
					}) }), e.rows.map((t) => {
						let n = u ? d === t.id : l ? p.includes(t.id) : !1;
						return /* @__PURE__ */ s("tr", {
							className: N("border-b last:border-0", (u || l) && "cursor-pointer hover:bg-accent/40", n && "bg-primary/5"),
							onClick: () => (u || l) && h(t.id),
							children: [l && /* @__PURE__ */ o("td", {
								className: "py-2 pr-2",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ o(L, {
									checked: n,
									onCheckedChange: () => h(t.id),
									"aria-label": `Select row ${t.id}`
								})
							}), e.columns.map((e) => /* @__PURE__ */ o("td", {
								className: "py-2 pr-4 align-top",
								children: Me(t[e.key])
							}, e.key))]
						}, t.id);
					})] })]
				})
			}),
			l && /* @__PURE__ */ s("footer", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ o(F, {
					variant: "ghost",
					size: "sm",
					onClick: a,
					children: "Cancel"
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: g,
					disabled: p.length === 0,
					children: "Submit"
				})]
			})
		]
	});
}
function Me(e) {
	return e == null ? "" : typeof e == "boolean" ? e ? "Yes" : "No" : String(e);
}
//#endregion
//#region src/packages/components/Upload/Upload.tsx
function Ne({ props: e, value: n, onChange: r, onSubmit: i, onCancel: a }) {
	let [c, l] = t.useState(n ?? []), u = t.useRef(null), [d, f] = t.useState(!1), [p, m] = t.useState(null);
	function h(e) {
		return new Promise((t, n) => {
			let r = new FileReader();
			r.onerror = () => n(r.error), r.onload = () => {
				t({
					name: e.name,
					size: e.size,
					type: e.type,
					dataUri: typeof r.result == "string" ? r.result : void 0
				});
			}, r.readAsDataURL(e);
		});
	}
	async function g(t) {
		m(null);
		let n = Array.from(t), i = [];
		for (let t of n) {
			if (e.maxSize && t.size > e.maxSize) {
				m(`${t.name} exceeds maxSize of ${e.maxSize} bytes`);
				continue;
			}
			if (e.accept && !e.accept.split(",").map((e) => e.trim()).filter(Boolean).some((e) => e.endsWith("/*") ? t.type.startsWith(e.slice(0, -1)) : t.type === e)) {
				m(`${t.name} does not match accept "${e.accept}"`);
				continue;
			}
			try {
				i.push(await h(t));
			} catch {
				m(`Failed to read ${t.name}`);
			}
		}
		let a = e.multiple ? [...c, ...i] : i.slice(0, 1);
		l(a), r(a);
	}
	function _(e) {
		e.target.files && e.target.files.length > 0 && (g(e.target.files), e.target.value = "");
	}
	function v(e) {
		e.preventDefault(), f(!1), e.dataTransfer.files && e.dataTransfer.files.length > 0 && g(e.dataTransfer.files);
	}
	let y = !e.required || c.length > 0;
	return /* @__PURE__ */ s("section", {
		className: "aui-upload rounded-lg border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ s("header", {
				className: "mb-3",
				children: [/* @__PURE__ */ o("h3", {
					className: "text-base font-semibold leading-none",
					children: e.title
				}), e.description && /* @__PURE__ */ o("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: e.description
				})]
			}),
			/* @__PURE__ */ s("div", {
				onDragOver: (e) => {
					e.preventDefault(), f(!0);
				},
				onDragLeave: () => f(!1),
				onDrop: v,
				className: N("rounded-md border border-dashed p-6 text-center text-sm transition-colors", d ? "border-primary bg-primary/5" : "border-input"),
				children: [
					/* @__PURE__ */ s("div", {
						className: "text-muted-foreground",
						children: [
							"Drop ",
							e.multiple ? "files" : "a file",
							" here, or"
						]
					}),
					/* @__PURE__ */ s(F, {
						variant: "outline",
						size: "sm",
						className: "mt-3",
						onClick: () => u.current?.click(),
						children: ["Choose file", e.multiple ? "s" : ""]
					}),
					/* @__PURE__ */ o("input", {
						ref: u,
						type: "file",
						className: "hidden",
						accept: e.accept,
						multiple: e.multiple,
						onChange: _
					}),
					e.maxSize && /* @__PURE__ */ s("div", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [
							"Max size: ",
							Math.round(e.maxSize / 1024),
							" KB"
						]
					})
				]
			}),
			p && /* @__PURE__ */ o("div", {
				className: "mt-3 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive",
				children: p
			}),
			c.length > 0 && /* @__PURE__ */ o("ul", {
				className: "mt-3 space-y-1 text-sm",
				children: c.map((e, t) => /* @__PURE__ */ s("li", {
					className: "flex items-center justify-between rounded-md border bg-background px-3 py-2",
					children: [/* @__PURE__ */ o("span", {
						className: "truncate",
						children: e.name
					}), /* @__PURE__ */ s("span", {
						className: "ml-3 shrink-0 text-xs text-muted-foreground",
						children: [Math.round(e.size / 1024), " KB"]
					})]
				}, `${e.name}-${t}`))
			}),
			/* @__PURE__ */ s("footer", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ o(F, {
					variant: "ghost",
					size: "sm",
					onClick: a,
					children: "Cancel"
				}), /* @__PURE__ */ o(F, {
					size: "sm",
					onClick: () => i(c),
					disabled: !y,
					children: "Submit"
				})]
			})
		]
	});
}
//#endregion
//#region src/packages/components/defaultRegistry.ts
function Pe() {
	k("radio", {
		schema: f,
		component: I,
		displayName: "Radio"
	}), k("checkbox", {
		schema: m,
		component: z,
		displayName: "Checkbox"
	}), k("select", {
		schema: g,
		component: V,
		displayName: "Select"
	}), k("form", {
		schema: x,
		component: G,
		displayName: "Form"
	}), k("confirm", {
		schema: S,
		component: q,
		displayName: "Confirm"
	}), k("wizard", {
		schema: w,
		component: Ee,
		displayName: "Wizard"
	}), k("card", {
		schema: ue,
		component: Ae,
		displayName: "Card"
	}), k("table", {
		schema: T,
		component: je,
		displayName: "Table"
	}), k("upload", {
		schema: E,
		component: Ne,
		displayName: "Upload"
	});
}
//#endregion
//#region src/packages/adapter-ai-sdk/AIMessageUI.tsx
function Fe({ parts: e }) {
	let n = t.useMemo(() => Ie(e ?? []), [e]);
	return n.length === 0 ? null : /* @__PURE__ */ o("div", {
		className: "flex flex-col gap-2",
		children: n.map((e, t) => /* @__PURE__ */ o(j, { schema: e }, t))
	});
}
function Ie(e) {
	let t = [];
	for (let n of e) {
		if (n.type === "data-ui" && $(n.data)) {
			t.push(n.data);
			continue;
		}
		if (n.type === "tool-show_ui" && n.toolInvocation?.result && $(n.toolInvocation.result)) {
			t.push(n.toolInvocation.result);
			continue;
		}
		if (n.type === "tool-invocation" && n.toolInvocation?.toolName === "show_ui" && $(n.toolInvocation.result)) {
			t.push(n.toolInvocation.result);
			continue;
		}
	}
	return t;
}
function $(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.component == "string" && "props" in t;
}
//#endregion
//#region src/packages/adapter-assistant-ui/ToolRenderer.tsx
var Le = ({ result: e, onSubmit: t, onCancel: n }) => Re(e) ? /* @__PURE__ */ o(j, {
	schema: e,
	onSubmit: (e) => {
		t ? t(e) : (console.info("[ai-business-ui] submit:", e), window.dispatchEvent(new CustomEvent("ai-business-ui:submit", { detail: e })));
	},
	onCancel: () => {
		n ? n() : window.dispatchEvent(new CustomEvent("ai-business-ui:cancel"));
	}
}) : /* @__PURE__ */ o("div", {
	className: "rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive",
	children: "Tool result is not a valid UIAction."
});
function Re(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.component == "string" && "props" in t;
}
//#endregion
export { Fe as AIMessageUI, Le as AssistantUIToolRenderer, F as Button, J as Card, Q as CardContent, Z as CardDescription, ke as CardFooter, Y as CardHeader, X as CardTitle, Ae as CardView, L as Checkbox, z as CheckboxView, q as ConfirmView, G as FormView, H as Input, R as Label, K as Modal, P as RadioGroup, I as RadioView, B as Select, V as SelectView, W as Switch, je as TableView, U as Textarea, j as UIRenderer, Ne as UploadView, Ee as WizardView, le as cardItemSchema, ue as cardPropsSchema, de as cardValueSchema, m as checkboxPropsSchema, h as checkboxValueSchema, ve as clearRegistry, N as cn, S as confirmPropsSchema, oe as confirmValueSchema, b as formFieldSchema, x as formPropsSchema, ae as formValueSchema, A as getComponent, ge as listComponents, d as makeUIAction, u as optionSchema, f as radioPropsSchema, p as radioValueSchema, k as registerComponent, Pe as registerDefaultComponents, g as selectPropsSchema, _ as selectValueSchema, fe as tableColumnSchema, T as tablePropsSchema, pe as tableRowSchema, me as tableValueSchema, _e as unregisterComponent, D as uploadFileSchema, E as uploadPropsSchema, he as uploadValueSchema, ye as useUIResult, w as wizardPropsSchema, C as wizardStepSchema, se as wizardValueSchema };

//# sourceMappingURL=index.js.map