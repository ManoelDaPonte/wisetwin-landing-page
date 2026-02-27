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
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		company: "",
		email: "",
	});
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMsg, setErrorMsg] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMsg("");

		if (!formData.firstName || !formData.lastName || !formData.company || !formData.email) {
			setErrorMsg(t("required"));
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			setErrorMsg(t("invalidEmail"));
			return;
		}

		setStatus("loading");

		try {
			const res = await fetch("/api/try-free", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
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
			setTimeout(() => {
				setFormData({ firstName: "", lastName: "", phone: "", company: "", email: "" });
				setStatus("idle");
				setErrorMsg("");
			}, 200);
		}
	};

	const updateField = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant={variant} size={size} className={className}>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
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
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-1.5 block">
									{t("firstName")} <span className="text-secondary">{t("required")}</span>
								</label>
								<Input
									placeholder={t("firstNamePlaceholder")}
									value={formData.firstName}
									onChange={updateField("firstName")}
									disabled={status === "loading"}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-1.5 block">
									{t("lastName")} <span className="text-secondary">{t("required")}</span>
								</label>
								<Input
									placeholder={t("lastNamePlaceholder")}
									value={formData.lastName}
									onChange={updateField("lastName")}
									disabled={status === "loading"}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-1.5 block">
									{t("phone")}
								</label>
								<Input
									type="tel"
									placeholder={t("phonePlaceholder")}
									value={formData.phone}
									onChange={updateField("phone")}
									disabled={status === "loading"}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-1.5 block">
									{t("company")} <span className="text-secondary">{t("required")}</span>
								</label>
								<Input
									placeholder={t("companyPlaceholder")}
									value={formData.company}
									onChange={updateField("company")}
									disabled={status === "loading"}
								/>
							</div>
						</div>
						<div>
							<label className="text-sm font-medium mb-1.5 block">
								{t("email")} <span className="text-secondary">{t("required")}</span>
							</label>
							<Input
								type="email"
								placeholder={t("emailPlaceholder")}
								value={formData.email}
								onChange={updateField("email")}
								disabled={status === "loading"}
								className={cn(errorMsg && "border-red-500")}
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
