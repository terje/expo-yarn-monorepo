/* eslint-disable no-underscore-dangle */
// Logic adapted from CKEditor
// https://github.com/ckeditor/ckeditor5-media-embed

declare global {
    interface Window {
        __getYouwellVariable?: (variable: string) => string;
    }
}

// const oembedRegex = /<oembed (?:url="([^"]*)".*?)><\/oembed>/g;
const oembedRegex = /<oembed .*?><\/oembed>/g;
const urlRegex = /url="([^"]*)".*?/;
const figureRegex = /<figure .*?><\/figure>/g;
const imgRegex = /<img (.*?)>/g;
const srcRegex = /src="([^"]*)".*?/;
const internalLinkRegex = /<a.class=.internalLink.[^>]*>(.*?)<\/a>/g;
const stringVariableRegex = /{{(.*?)}}/g;
const elementIdRegex = /data-elementid="([^"]*)".*?/;
const tableFigureRegex = /<figure[^>]+class="table.*?><\/figure>/g;
const tableRegex = /<table(.*?)>/g;
const firstStyleWidthRegex = /style="[^"]*width:([^;]*);"/;
const styleRegex = /style="([^"]*)"/;

const videoProviders = [
    {
        name: 'dailymotion',
        url: /^dailymotion\.com\/video\/(\w+)/,
        html: (url: string) => '<div style="position: relative; padding-bottom: 100%; height: 0; ">'
                        + `<iframe src="https://www.dailymotion.com/embed/video/${url}" `
                            + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" '
                            + 'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">'
                        + '</iframe>'
                    + '</div>'
        ,
    },
    {
        name: 'youtube',
        url: [
            /^youtube\.com\/watch\?v=([\w-]+)/,
            /^youtube\.com\/v\/([\w-]+)/,
            /^youtube\.com\/embed\/([\w-]+)/,
            /^youtu\.be\/([\w-]+)/,
        ],
        html: (url: string) => '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                        + `<iframe src="https://www.youtube.com/embed/${url}" `
                            + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" '
                            + 'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>'
                        + '</iframe>'
                    + '</div>'
        ,
    },
    {
        name: 'vimeo',
        url: [
            /^vimeo\.com\/(\d+)/,
            /^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
            /^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
            /^vimeo\.com\/channels\/[^/]+\/(\d+)/,
            /^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
            /^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
            /^player\.vimeo\.com\/video\/(\d+)/,
        ],
        html: (url: string) => '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                        + `<iframe src="https://player.vimeo.com/video/${url}" `
                            + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" '
                            + 'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>'
                        + '</iframe>'
                    + '</div>'
        ,
    },
    {
        name: 'matterport',
        url: /my\.matterport\.com\/show\/\?m=(\w+)/,
        html: (url: string) => '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
                        + `<iframe src="https://my.matterport.com/show/?m=${url}" `
                            + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" '
                            + 'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="xr-spatial-tracking">'
                        + '</iframe>'
                    + '</div>'
        ,
    },
    // {
    //     name: 'spotify',
    //     url: [
    //         /^open\.spotify\.com\/(artist\/\w+)/,
    //         /^open\.spotify\.com\/(album\/\w+)/,
    //         /^open\.spotify\.com\/(track\/\w+)/,
    //     ],
    //     html: url => '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">'
    //                     + `<iframe src="https://open.spotify.com/embed/${url}" `
    //                         + 'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" '
    //                         + 'frameborder="0" allowtransparency="true" allow="encrypted-media">'
    //                     + '</iframe>'
    //                 + '</div>'
    //     ,
    // },
    // {
    //     name: 'instagram',
    //     url: /^instagram\.com\/p\/(\w+)/,
    // },
    // {
    //     name: 'twitter',
    //     url: /^twitter\.com/,
    // },
    // {
    //     name: 'googleMaps',
    //     url: /^google\.com\/maps/,
    // },
    // {
    //     name: 'flickr',
    //     url: /^flickr\.com/,
    // },
    // {
    //     name: 'facebook',
    //     url: /^facebook\.com/,
    // },
];

/**
 * Tries to match `url` to `pattern`.
 *
 * @param {String} url The URL of the media.
 * @param {RegExp} pattern The pattern that should accept the media URL.
 * @returns {Array|null}
 */
const getUrlMatches = (url: string, pattern: RegExp): RegExpMatchArray | null => {
    // 1. Try to match without stripping the protocol and "www" subdomain.
    let match = url.match(pattern);

    if (match) {
        return match;
    }

    // 2. Try to match after stripping the protocol.
    let rawUrl = url.replace(/^https?:\/\//, '');
    match = rawUrl.match(pattern);

    if (match) {
        return match;
    }

    // 3. Try to match after stripping the "www" subdomain.
    rawUrl = rawUrl.replace(/^www\./, '');
    match = rawUrl.match(pattern);

    if (match) {
        return match;
    }

    return null;
};

export const detectPattern = (patterns: RegExp[], url: string) => {
    for (let i = 0; i < patterns.length; i++) {
        const match = getUrlMatches(url, patterns[i]);

        if (match) {
            return match;
        }
    }
    return null;
};

const replaceVideo = (html: string) => {
    const match = html.match(oembedRegex);

    if (!match) {
        return html;
    }

    let replaced = html;

    for (let m = 0; m < match.length; m++) {
        const urlMatch = match[m].match(urlRegex);
        const url = urlMatch?.[1].trim();
        if (url) {
            for (let i = 0; i < videoProviders.length; i++) {
                let pattern = videoProviders[i].url;

                if (!Array.isArray(pattern)) {
                    pattern = [pattern];
                }

                const patternMatch = detectPattern(pattern, url);
                if (patternMatch?.[1]) {
                    replaced = replaced.replace(match[m], videoProviders[i].html(patternMatch[1]));
                }
            }
        }
    }

    return replaced;
};

const addNoContextMenu = (html: string) => {
    const match = html.match(imgRegex);

    if (!match) {
        return html;
    }
    let replaced = html;

    for (let m = 0; m < match.length; m++) {
        const withNoContext = match[m].replace('<img ', '<img style="-webkit-user-select: none; -webkit-touch-callout: none;" oncontextmenu="return false"');
        replaced = replaced.replace(match[m], withNoContext);
    }

    return replaced;
};

const addAppIdToImages = (html: string, appId?: string) => {
    if (!appId) return html;

    const match = html.match(imgRegex);

    if (!match) {
        return html;
    }
    let replaced = html;

    for (let m = 0; m < match.length; m++) {
        const urlMatch = match[m].match(srcRegex);
        if (urlMatch?.[1]) {
            const ampOrQuestion = urlMatch[1].indexOf('?') > -1 ? '&' : '?';
            const withAppId = match[m].replace(urlMatch[1], `${urlMatch[1]}${ampOrQuestion}xAppId=${appId}`);
            replaced = replaced.replace(match[m], withAppId);
        }
    }

    for (let m = 0; m < match.length; m++) {
        const withNoContext = match[m].replace('<img ', '<img style="-webkit-user-select: none; -webkit-touch-callout: none;" oncontextmenu="return false"');
        replaced = replaced.replace(match[m], withNoContext);
    }

    return replaced;
};

const fixTableWidthLayout = (html: string) => {
    const match = html.match(tableFigureRegex);

    if (!match) {
        return html;
    }
    let replaced = html;

    for (let m = 0; m < match.length; m++) {
        const figureStyleMatch = match[m].match(firstStyleWidthRegex);

        if (figureStyleMatch) {
            const width = figureStyleMatch[1];
            const tableMatch = match[m].match(tableRegex);
            if (tableMatch) {
                const existingTableStyle = tableMatch[0].match(styleRegex);

                let tableReplaced = match[m].replace(firstStyleWidthRegex, figureStyleMatch[0].replace(`width:${width};`, ''));
                if (existingTableStyle) {
                    tableReplaced = tableReplaced.replace(existingTableStyle[1], `${existingTableStyle[1]};width:${width};" `);
                } else {
                    // match both open and closed table-tag.. rewrite to 1 regex?
                    tableReplaced = tableReplaced.replace('<table ', `<table style="width:${width};" `);
                    tableReplaced = tableReplaced.replace('<table>', `<table style="width:${width};">`);
                }

                replaced = replaced.replace(match[m], tableReplaced);
            }
        }
    }

    return replaced;
};

const replaceInternalLinks = (html: string) => {
    const match = html.match(internalLinkRegex);

    if (!match) {
        return html;
    }
    let replaced = html;

    for (let m = 0; m < match.length; m++) {
        const idMatch = match[m].match(elementIdRegex);
        if (idMatch) {
            const elementId = idMatch[1]?.trim();

            const withAction = match[m].replace(idMatch[0], `onclick="__clickInternalLink('${elementId}')"`);
            replaced = replaced.replace(match[m], withAction);
        }
    }

    return replaced;
};

const replaceStringVariables = (html: string) => {
    const match = html.match(stringVariableRegex);

    if (!match) {
        return html;
    }
    let replaced = html;

    for (let m = 0; m < match.length; m++) {
        if (window.__getYouwellVariable) {
            const variable = match[m].slice(2, -2);
            replaced = replaced.replace(match[m], `${window.__getYouwellVariable(variable)}`);
        }
    }

    return replaced;
};

export const replaceEmbedContent = (html: string | null | undefined, addNoContextForImages = false, xAppId?: string) => {
    if (!html) return '';
    let replaced = replaceVideo(html);
    if (addNoContextForImages) {
        replaced = addNoContextMenu(html);
    }
    replaced = addAppIdToImages(replaced, xAppId);
    replaced = fixTableWidthLayout(replaced);
    replaced = replaceInternalLinks(replaced);
    replaced = replaceStringVariables(replaced);
    return replaced;
};

export const isEmptyHtml = (html: string | null | undefined) => !html || html.trim() === '<p>&nbsp;</p>';

export const findImageUrl = (html: string) => {
    if (!html) {
        return null;
    }

    const match = html.match(figureRegex);
    if (!match) {
        return null;
    }

    for (let m = 0; m < match.length; m++) {
        const urlMatch = match[m].match(srcRegex);
        if (urlMatch?.[1]) {
            return urlMatch[1].trim();
        }
    }
    return null;
};

export const findImageUrls = (html: string) => {
    if (!html) {
        return null;
    }

    const match = html.match(figureRegex);
    if (!match) {
        return null;
    }

    const urls = [];

    for (let m = 0; m < match.length; m++) {
        const urlMatch = match[m].match(srcRegex);
        if (urlMatch?.[1]) {
            urls.push(urlMatch[1].trim());
        }
    }
    return urls;
};

export const stripHtml = (html: string | null | undefined, defaultText?: string) => {
    if (!html) {
        return defaultText || '';
    }
    const regex = /(<([^>]+)>)/ig;
    return html.replace(regex, '').replace('&nbsp;', ' ');
};

export const textpart = (html: string | null | undefined, length?: number) => {
    const t = stripHtml(html);
    return length && t.length > length ? `${t.slice(0, length)}...` : t;
};

export const getVideos = (html: string) => {
    const match = html && html.match(oembedRegex);
    const videoContent = [];

    if (match) {
        for (let m = 0; m < match.length; m++) {
            const urlMatch = match[m].match(urlRegex);
            const url = urlMatch?.[1].trim();

            if (url) {
                for (let i = 0; i < videoProviders.length; i++) {
                    let pattern = videoProviders[i].url;

                    if (!Array.isArray(pattern)) {
                        pattern = [pattern];
                    }

                    const patternMatch = detectPattern(pattern, url);
                    if (patternMatch?.[1]) {
                        videoContent.push(videoProviders[i].html(patternMatch[1]));
                    }
                }
            }
        }
    }

    return videoContent;
};
