export enum Device {
    PHONE = 'PHONE',
    DESKTOP = 'DESKTOP',
    TABLET = 'TABLET'
}

export enum CoreMetrics {
    cumulative_layout_shift = 'cumulative_layout_shift',
    experimental_time_to_first_byte = 'experimental_time_to_first_byte',
    first_contentful_paint = 'first_contentful_paint',
    first_input_delay = 'first_input_delay',
    interaction_to_next_paint = 'interaction_to_next_paint',
    largest_contentful_paint = 'largest_contentful_paint'
}

export enum CoreEffectiveConnectionTypes {
    offline = 'offline',
    slow_2G = 'slow-2G',
    _2G = '2G',
    _3G = '3G',
    _4G = '4G',
}

export const ConnectionTypesList = [CoreEffectiveConnectionTypes.offline, CoreEffectiveConnectionTypes.slow_2G, CoreEffectiveConnectionTypes._2G, CoreEffectiveConnectionTypes._3G, CoreEffectiveConnectionTypes._4G];

export enum Metrics {
    cumulative_layout_shift = 'Cumulative Layout Shift (CLS)',
    experimental_time_to_first_byte = 'Time to First Byte (TTFB)',
    first_contentful_paint = 'First Contentful Paint (FCP)',
    first_input_delay = 'First Input Delay (FID)',
    interaction_to_next_paint = 'Interaction to Next Paint (INP)',
    largest_contentful_paint = 'Largest Contentful Paint (FCP)'
}

export enum MetricsLink {
    cumulative_layout_shift = 'https://web.dev/articles/cls',
    experimental_time_to_first_byte = 'https://web.dev/articles/ttfb',
    first_contentful_paint = 'https://web.dev/articles/fcp',
    first_input_delay = 'https://web.dev/articles/fid',
    interaction_to_next_paint = 'https://web.dev/articles/inp',
    largest_contentful_paint = 'https://web.dev/articles/lcp'
}

export const CORE_PAGE_VITALS = [CoreMetrics.largest_contentful_paint, CoreMetrics.first_input_delay, CoreMetrics.cumulative_layout_shift];
export const EXTRA_PAGE_VITALS = [CoreMetrics.experimental_time_to_first_byte, CoreMetrics.interaction_to_next_paint, CoreMetrics.first_contentful_paint];
export const COMBINED_PAGE_VITALS = [...CORE_PAGE_VITALS, ...EXTRA_PAGE_VITALS];