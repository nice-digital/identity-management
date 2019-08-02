declare module "@nice-digital/nds-tag" {
	import React from "react";
	interface TagProps {
		alpha: boolean;
	}
	export const Tag: React.FC<TagProps>;
	// export const Tag: any;
}
