import React, { useEffect } from "react";
import { Eye } from "lucide-react";
import { useInteraction } from "../../lib/interaction-context";

export const VisitorCounter: React.FC<{ style?: "badge" | "inline"; showOrdinal?: boolean }> = ({ style = "badge", showOrdinal = false }) => {
	const { visitorCount, incrementVisitor } = useInteraction();

	useEffect(() => {
		incrementVisitor();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderContent = () => {
		if (showOrdinal) {
			return `You're visitor #${String(visitorCount).padStart(5, "0")}.`;
		}
		return `👀 ${visitorCount} people have viewed my site today.`;
	};

	if (style === "inline") {
		return <span className="text-sm text-gray-300">{renderContent()}</span>;
	}

	return (
		<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 border border-gray-700 rounded-full text-gray-200 text-xs shadow">
			<Eye className="w-3.5 h-3.5 text-emerald-400" />
			{renderContent()}
		</div>
	);
};

export default VisitorCounter;


