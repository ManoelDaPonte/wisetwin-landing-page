export type FaqItem = {
	id: string;
	questionKey: string;
	answerKey: string;
	category: "general" | "features" | "pricing" | "technical";
};

// 5 questions principales pour la homepage
export const featuredFaqs: FaqItem[] = [
	{
		id: "what-is-wisetwin",
		questionKey: "whatIsWisetwin.question",
		answerKey: "whatIsWisetwin.answer",
		category: "general",
	},
	{
		id: "what-is-wisetrainer",
		questionKey: "whatIsWiseTrainer.question",
		answerKey: "whatIsWiseTrainer.answer",
		category: "general",
	},
	{
		id: "deployment-time",
		questionKey: "deploymentTime.question",
		answerKey: "deploymentTime.answer",
		category: "technical",
	},
	{
		id: "pricing-model",
		questionKey: "pricingModel.question",
		answerKey: "pricingModel.answer",
		category: "pricing",
	},
	{
		id: "no-vr-headset",
		questionKey: "noVrHeadset.question",
		answerKey: "noVrHeadset.answer",
		category: "technical",
	},
];

// Toutes les questions
export const allFaqs: FaqItem[] = [
	// General
	{
		id: "what-is-wisetwin",
		questionKey: "whatIsWisetwin.question",
		answerKey: "whatIsWisetwin.answer",
		category: "general",
	},
	{
		id: "how-helps",
		questionKey: "howHelps.question",
		answerKey: "howHelps.answer",
		category: "general",
	},
	{
		id: "what-is-wisetrainer",
		questionKey: "whatIsWiseTrainer.question",
		answerKey: "whatIsWiseTrainer.answer",
		category: "general",
	},
	{
		id: "what-is-wisepaper",
		questionKey: "whatIsWisePaper.question",
		answerKey: "whatIsWisePaper.answer",
		category: "general",
	},
	{
		id: "support",
		questionKey: "support.question",
		answerKey: "support.answer",
		category: "general",
	},
	// Features
	{
		id: "training-types",
		questionKey: "trainingTypes.question",
		answerKey: "trainingTypes.answer",
		category: "features",
	},
	{
		id: "existing-content",
		questionKey: "existingContent.question",
		answerKey: "existingContent.answer",
		category: "features",
	},
	{
		id: "languages",
		questionKey: "languages.question",
		answerKey: "languages.answer",
		category: "features",
	},
	{
		id: "progress-tracking",
		questionKey: "progressTracking.question",
		answerKey: "progressTracking.answer",
		category: "features",
	},
	{
		id: "training-plans",
		questionKey: "trainingPlans.question",
		answerKey: "trainingPlans.answer",
		category: "features",
	},
	{
		id: "certifications",
		questionKey: "certifications.question",
		answerKey: "certifications.answer",
		category: "features",
	},
	{
		id: "reminders",
		questionKey: "reminders.question",
		answerKey: "reminders.answer",
		category: "features",
	},
	{
		id: "guest-mode",
		questionKey: "guestMode.question",
		answerKey: "guestMode.answer",
		category: "features",
	},
	{
		id: "create-simulator",
		questionKey: "createSimulator.question",
		answerKey: "createSimulator.answer",
		category: "features",
	},
	{
		id: "asset-ownership",
		questionKey: "assetOwnership.question",
		answerKey: "assetOwnership.answer",
		category: "features",
	},
	{
		id: "scenario-types",
		questionKey: "scenarioTypes.question",
		answerKey: "scenarioTypes.answer",
		category: "features",
	},
	// Pricing
	{
		id: "pricing-model",
		questionKey: "pricingModel.question",
		answerKey: "pricingModel.answer",
		category: "pricing",
	},
	{
		id: "wisetrainer-pricing",
		questionKey: "wisetrainerPricing.question",
		answerKey: "wisetrainerPricing.answer",
		category: "pricing",
	},
	{
		id: "economic-benefits",
		questionKey: "economicBenefits.question",
		answerKey: "economicBenefits.answer",
		category: "pricing",
	},
	// Technical
	{
		id: "deployment-time",
		questionKey: "deploymentTime.question",
		answerKey: "deploymentTime.answer",
		category: "technical",
	},
	{
		id: "security",
		questionKey: "security.question",
		answerKey: "security.answer",
		category: "technical",
	},
	{
		id: "no-vr-headset",
		questionKey: "noVrHeadset.question",
		answerKey: "noVrHeadset.answer",
		category: "technical",
	},
	{
		id: "installation",
		questionKey: "installation.question",
		answerKey: "installation.answer",
		category: "technical",
	},
	{
		id: "hr-integration",
		questionKey: "hrIntegration.question",
		answerKey: "hrIntegration.answer",
		category: "technical",
	},
	{
		id: "multi-site",
		questionKey: "multiSite.question",
		answerKey: "multiSite.answer",
		category: "technical",
	},
	{
		id: "hybrid-training",
		questionKey: "hybridTraining.question",
		answerKey: "hybridTraining.answer",
		category: "features",
	},
	{
		id: "technical-requirements",
		questionKey: "technicalRequirements.question",
		answerKey: "technicalRequirements.answer",
		category: "technical",
	},
	{
		id: "gdpr-compliance",
		questionKey: "gdprCompliance.question",
		answerKey: "gdprCompliance.answer",
		category: "technical",
	},
	{
		id: "free-trial",
		questionKey: "freeTrial.question",
		answerKey: "freeTrial.answer",
		category: "pricing",
	},
];
