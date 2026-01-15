import { LinkArrowIcon } from "@assets/icons";
import clsx from "clsx/lite";

import styles from "./InlineLink.module.css";

type InlineLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function InlineLink(props: InlineLinkProps) {
	const { className, children, ...restProps } = props;

	return (
		<a className={clsx(styles.host, className)} {...restProps}>
			{children}
			<LinkArrowIcon />
		</a>
	);
}
