import React from 'react';
import IndexPage from '@/ui-pages/IndexPage';

const PageCompute = (props) => (<IndexPage {...props} />);

function getPath(req, fallback) {
    if (req) {
        return req.url;
    } else if (typeof window !== 'undefined') {
        return window.location.pathname;
    } else {
        return fallback;
    }
}

PageCompute.getInitialProps = async (ctx) => {
    const path = getPath(ctx.req, '');

    return { path };
};

export default PageCompute;
