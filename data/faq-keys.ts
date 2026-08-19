// L'ordre reflète la priorité éditoriale : prestations & conseil d'abord,
// les questions liées aux produits/plateforme en dernier.
export const allFaqKeys = [
	// Prestations & conseil
	{ key: "projectTypes", category: "services" },
	{ key: "smallProjects", category: "services" },
	{ key: "consultingOnly", category: "services" },
	{ key: "process", category: "services" },
	{ key: "delays", category: "services" },
	{ key: "onsite", category: "services" },
	{ key: "assetOwnership", category: "services" },
	{ key: "confidentiality", category: "services" },
	{ key: "interoperability", category: "services" },
	{ key: "aftercare", category: "services" },
	// Pricing
	{ key: "quote", category: "pricing" },
	{ key: "pricingModel", category: "pricing" },
	{ key: "siteBudgets", category: "pricing" },
	{ key: "wisetrainerPricing", category: "pricing" },
	{ key: "simulatorPricing", category: "pricing" },
	// General
	{ key: "whoIsWisetwin", category: "general" },
	{ key: "whatDoYouDo", category: "general" },
	{ key: "whoWorks", category: "general" },
	{ key: "clients", category: "general" },
	{ key: "productsVsCustom", category: "general" },
	// Technical (plateforme)
	{ key: "security", category: "technical" },
	{ key: "gdprCompliance", category: "technical" },
	{ key: "noVrHeadset", category: "technical" },
	{ key: "installation", category: "technical" },
	{ key: "multiSite", category: "technical" },
	{ key: "technicalRequirements", category: "technical" },
] as const;
