import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

type InteractionContextValue = {
	selectedSkill: string | null;
	setSelectedSkill: (skill: string | null) => void;
	visitorCount: number;
	incrementVisitor: () => void;
};

const InteractionContext = createContext<InteractionContextValue | undefined>(undefined);

export const InteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
	const [visitorCount, setVisitorCount] = useState<number>(0);

	useEffect(() => {
		try {
			const todayKey = new Date().toISOString().slice(0, 10);
			const stored = localStorage.getItem("visitorCount:" + todayKey);
			if (stored) {
				setVisitorCount(parseInt(stored, 10) || 0);
			} else {
				localStorage.clear();
				localStorage.setItem("visitorCount:" + todayKey, "0");
			}
		} catch {}
	}, []);

	const incrementVisitor = () => {
		setVisitorCount((prev) => {
			const next = prev + 1;
			try {
				const todayKey = new Date().toISOString().slice(0, 10);
				localStorage.setItem("visitorCount:" + todayKey, String(next));
			} catch {}
			return next;
		});
	};

	const value = useMemo(
		() => ({ selectedSkill, setSelectedSkill, visitorCount, incrementVisitor }),
		[selectedSkill, visitorCount]
	);

	return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>;
};

export const useInteraction = (): InteractionContextValue => {
	const ctx = useContext(InteractionContext);
	if (!ctx) throw new Error("useInteraction must be used within InteractionProvider");
	return ctx;
};


