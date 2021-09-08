import React, { forwardRef } from 'react';
import Link from 'next/link';

const LinkItem = forwardRef(({ children, ...props }, ref) => {
    return (<a ref={ref} {...props}>{children}</a>);
});

function NextLink({ children, to, ...props }) {
    return (
        <Link href={to || '#'} passHref scroll={false}>
            <LinkItem {...props}>{children}</LinkItem>
        </Link>
    );
}

export default NextLink;
