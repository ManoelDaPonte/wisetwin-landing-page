"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TryFreeButtonProps {
	children: React.ReactNode;
	className?: string;
	variant?: "default" | "outline" | "ghost" | "secondary";
	size?: "default" | "sm" | "lg" | "icon";
}

export function TryFreeButton({
	children,
	className,
	variant = "default",
	size = "default",
}: TryFreeButtonProps) {
	const t = useTranslations("tryFree");
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMsg, setErrorMsg] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMsg("");

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setErrorMsg(t("invalidEmail"));
			return;
		}

		setStatus("loading");

		try {
			const res = await fetch("/api/try-free", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!res.ok) throw new Error();
			setStatus("success");
		} catch {
			setStatus("error");
			setErrorMsg(t("error"));
		}
	};

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		if (!newOpen) {
			// Reset state when closing
			setTimeout(() => {
				setEmail("");
				setStatus("idle");
				setErrorMsg("");
			}, 200);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant={variant} size={size} className={className}>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{t("title")}</DialogTitle>
					<DialogDescription>{t("description")}</DialogDescription>
				</DialogHeader>

				{status === "success" ? (
					<div className="flex flex-col items-center gap-3 py-6">
						<div className="size-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
							<CheckCircle className="size-6 text-emerald-500" />
						</div>
						<p className="font-semibold">{t("success")}</p>
						<p className="text-sm text-muted-foreground text-center">
							{t("successDescription")}
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div>
							<Input
								type="email"
								placeholder={t("emailPlaceholder")}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={status === "loading"}
								className={cn(errorMsg && "border-red-500")}
								autoFocus
							/>
							{errorMsg && (
								<p className="text-sm text-red-500 mt-1">{errorMsg}</p>
							)}
						</div>
						<Button type="submit" disabled={status === "loading"}>
							{status === "loading" ? (
								<>
									<Loader2 className="size-4 animate-spin mr-2" />
									{t("submitting")}
								</>
							) : (
								t("submit")
							)}
						</Button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
