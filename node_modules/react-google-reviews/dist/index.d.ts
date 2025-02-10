import React$1 from 'react';

type ReviewCardCSSProps = {
    reviewCardClassName?: string;
    reviewCardStyle?: React.CSSProperties;
    reviewCardLightClassName?: string;
    reviewCardLightStyle?: React.CSSProperties;
    reviewCardDarkClassName?: string;
    reviewCardDarkStyle?: React.CSSProperties;
    reviewBodyCardClassName?: string;
    reviewBodyCardStyle?: React.CSSProperties;
    reviewBodyTestimonialClassName?: string;
    reviewBodyTestimonialStyle?: React.CSSProperties;
    reviewTextClassName?: string;
    reviewTextStyle?: React.CSSProperties;
    reviewTextLightClassName?: string;
    reviewTextLightStyle?: React.CSSProperties;
    reviewTextDarkClassName?: string;
    reviewTextDarkStyle?: React.CSSProperties;
    reviewReadMoreClassName?: string;
    reviewReadMoreStyle?: React.CSSProperties;
    reviewReadMoreLightClassName?: string;
    reviewReadMoreLightStyle?: React.CSSProperties;
    reviewReadMoreDarkClassName?: string;
    reviewReadMoreDarkStyle?: React.CSSProperties;
    reviewFooterClassName?: string;
    reviewFooterStyle?: React.CSSProperties;
    reviewerClassName?: string;
    reviewerStyle?: React.CSSProperties;
    reviewerProfileClassName?: string;
    reviewerProfileStyle?: React.CSSProperties;
    reviewerProfileImageClassName?: string;
    reviewerProfileImageStyle?: React.CSSProperties;
    reviewerProfileFallbackClassName?: string;
    reviewerProfileFallbackStyle?: React.CSSProperties;
    reviewerNameClassName?: string;
    reviewerNameStyle?: React.CSSProperties;
    reviewerNameLightClassName?: string;
    reviewerNameLightStyle?: React.CSSProperties;
    reviewerNameDarkClassName?: string;
    reviewerNameDarkStyle?: React.CSSProperties;
    reviewerDateClassName?: string;
    reviewerDateStyle?: React.CSSProperties;
    reviewerDateLightClassName?: string;
    reviewerDateLightStyle?: React.CSSProperties;
    reviewerDateDarkClassName?: string;
    reviewerDateDarkStyle?: React.CSSProperties;
};
type BadgeCSSProps = {
    badgeClassName?: string;
    badgeStyle?: React.CSSProperties;
    badgeContainerClassName?: string;
    badgeContainerStyle?: React.CSSProperties;
    badgeContainerLightClassName?: string;
    badgeContainerLightStyle?: React.CSSProperties;
    badgeContainerDarkClassName?: string;
    badgeContainerDarkStyle?: React.CSSProperties;
    badgeGoogleIconClassName?: string;
    badgeGoogleIconStyle?: React.CSSProperties;
    badgeInnerContainerClassName?: string;
    badgeInnerContainerStyle?: React.CSSProperties;
    badgeLabelClassName?: string;
    badgeLabelStyle?: React.CSSProperties;
    badgeLabelLightClassName?: string;
    badgeLabelLightStyle?: React.CSSProperties;
    badgeLabelDarkClassName?: string;
    badgeLabelDarkStyle?: React.CSSProperties;
    badgeRatingContainerClassName?: string;
    badgeRatingContainerStyle?: React.CSSProperties;
    badgeRatingClassName?: string;
    badgeRatingStyle?: React.CSSProperties;
    badgeRatingLightClassName?: string;
    badgeRatingLightStyle?: React.CSSProperties;
    badgeRatingDarkClassName?: string;
    badgeRatingDarkStyle?: React.CSSProperties;
    badgeStarsClassName?: string;
    badgeStarsStyle?: React.CSSProperties;
    badgeStarsContainerClassName?: string;
    badgeStarsContainerStyle?: React.CSSProperties;
    badgeStarsFilledClassName?: string;
    badgeStarsFilledStyle?: React.CSSProperties;
    badgeStarsEmptyClassName?: string;
    badgeStarsEmptyStyle?: React.CSSProperties;
    badgeLinkContainerClassName?: string;
    badgeLinkContainerStyle?: React.CSSProperties;
    badgeLinkClassName?: string;
    badgeLinkStyle?: React.CSSProperties;
    badgeLinkLightClassName?: string;
    badgeLinkLightStyle?: React.CSSProperties;
    badgeLinkDarkClassName?: string;
    badgeLinkDarkStyle?: React.CSSProperties;
    badgeLinkInlineClassName?: string;
    badgeLinkInlineStyle?: React.CSSProperties;
};
type CarouselCSSProps = {
    carouselClassName?: string;
    carouselStyle?: React.CSSProperties;
    carouselBtnClassName?: string;
    carouselBtnStyle?: React.CSSProperties;
    carouselBtnLeftClassName?: string;
    carouselBtnLeftStyle?: React.CSSProperties;
    carouselBtnRightClassName?: string;
    carouselBtnRightStyle?: React.CSSProperties;
    carouselBtnLightClassName?: string;
    carouselBtnLightStyle?: React.CSSProperties;
    carouselBtnDarkClassName?: string;
    carouselBtnDarkStyle?: React.CSSProperties;
    carouselBtnIconClassName?: string;
    carouselBtnIconStyle?: React.CSSProperties;
    carouselCardClassName?: string;
    carouselCardStyle?: React.CSSProperties;
};
type ErrorStateCSSProps = {
    errorClassName?: string;
    errorStyle?: React.CSSProperties;
};
type LoadingStateCSSProps = {
    loaderClassName?: string;
    loaderStyle?: React.CSSProperties;
    loaderSpinnerClassName?: string;
    loaderSpinnerStyle?: React.CSSProperties;
    loaderLabelClassName?: string;
    loaderLabelStyle?: React.CSSProperties;
};

type GoogleReview = {
    reviewId: string | null;
    reviewer: {
        profilePhotoUrl: string;
        displayName: string;
        isAnonymous: boolean;
    };
    starRating: number;
    comment: string;
    createTime: string | null;
    updateTime: string | null;
    reviewReply?: {
        comment: string;
        updateTime: string;
    } | null;
};
declare const GoogleReview: {};
type NameDisplay = "fullNames" | "firstAndLastInitials" | "firstNamesOnly";
type LogoVariant = "icon" | "full" | "none";
type DateDisplay = "relative" | "absolute" | "none";
type ReviewVariant = "testimonial" | "card";
type Theme = "light" | "dark";
interface FeaturableAPIResponseBase {
    success: boolean;
}
interface FeaturableAPIResponseSuccess extends FeaturableAPIResponseBase {
    success: true;
    profileUrl: string | null;
    batchSize: number;
    totalReviewCount: number;
    averageRating: number;
    reviews: GoogleReview[];
}
interface FeaturableAPIResponseError extends FeaturableAPIResponseBase {
    success: false;
}
type FeaturableAPIResponse = FeaturableAPIResponseSuccess | FeaturableAPIResponseError;
declare const FeaturableAPIResponse: {};

/** @jsxImportSource @emotion/react */

type StructuredDataProps = {
    /**
     * Total number of reviews.
     * This is automatically fetched when passing `featurableId`.
     * Required if `structuredData` is true and passing `reviews`.
     */
    totalReviewCount?: number;
    /**
     * Average star rating from 1 to 5.
     * This is automatically fetched when passing `featurableId`.
     * Required if `structuredData` is true and passing `reviews`.
     */
    averageRating?: number;
};
type ReactGoogleReviewsBaseProps = {
    /**
     * Layout of the reviews.
     */
    layout: "carousel" | "badge" | "custom";
    /**
     * How to display the reviewer's name.
     * Default: "firstAndLastInitials"
     */
    nameDisplay?: NameDisplay;
    /**
     * How to display the Google logo
     * Default: "icon"
     */
    logoVariant?: LogoVariant;
    /**
     * When collapsed, the maximum number of characters to display in the review body.
     * Default: 200
     */
    maxCharacters?: number;
    /**
     * How to display the review date.
     * Default: "relative"
     */
    dateDisplay?: DateDisplay;
    /**
     * Review card layout variant.
     * Default: "card"
     */
    reviewVariant?: ReviewVariant;
    /**
     * Color scheme of the component.
     * Default: "light"
     */
    theme?: Theme;
    /**
     * Enable or disable structured data.
     * Default: false
     */
    structuredData?: boolean;
    /**
     * Brand name for structured data.
     * Default: current page title
     */
    brandName?: string;
    /**
     * Product/service name for structured data.
     * Default: current page title
     */
    productName?: string;
    /**
     * Short description of the product/service for structured data.
     * Default: empty
     */
    productDescription?: string;
    /**
     * Enable/disable accessibility features.
     */
    accessibility?: boolean;
    /**
     * Hide reviews without text
     * Default: false
     */
    hideEmptyReviews?: boolean;
    /**
     * Disables translation from Google to use original review text
     * Default: false
     */
    disableTranslation?: boolean;
    /**
     * Customize the error message when reviews fail to load.
     * Default: "Failed to load Google reviews. Please try again later."
     */
    errorMessage?: React$1.ReactNode;
    /**
     * Customize the loading message when reviews are loading.
     * Default: "Loading reviews..."
     */
    loadingMessage?: React$1.ReactNode;
} & StructuredDataProps;
type ReactGoogleReviewsWithPlaceIdBaseProps = ReactGoogleReviewsBaseProps & {
    /**
     * If using Google Places API, use `dangerouslyFetchPlaceDetails` to get reviews server-side and pass them to the client.
     * Note: the Places API limits the number of reviews to FIVE most recent reviews.
     */
    reviews: GoogleReview[];
    featurableId?: never;
    /**
     * Controls the loading state of the component when fetching reviews manually.
     */
    isLoading?: boolean;
};
type ReactGoogleReviewsWithPlaceIdWithStructuredDataProps = {
    structuredData: true;
} & Required<StructuredDataProps>;
type ReactGoogleReviewsWithPlaceIdWithoutStructuredDataProps = {
    structuredData?: false;
};
type ReactGoogleReviewsWithPlaceIdProps = ReactGoogleReviewsWithPlaceIdBaseProps & (ReactGoogleReviewsWithPlaceIdWithStructuredDataProps | ReactGoogleReviewsWithPlaceIdWithoutStructuredDataProps);
type ReactGoogleReviewsWithFeaturableIdProps = ReactGoogleReviewsBaseProps & {
    reviews?: never;
    /**
     * If using Featurable API, pass the ID of the widget after setting it up in the dashboard.
     * Using the free Featurable API allows for unlimited reviews.
     * https://featurable.com/app/widgets
     */
    featurableId: string;
    isLoading?: never;
};
type ReactGoogleReviewsBasePropsWithRequired = ReactGoogleReviewsBaseProps & (ReactGoogleReviewsWithPlaceIdProps | ReactGoogleReviewsWithFeaturableIdProps) & ErrorStateCSSProps & LoadingStateCSSProps;
type ReactGoogleReviewsCarouselProps = ReactGoogleReviewsBasePropsWithRequired & {
    layout: "carousel";
    /**
     * Autoplay speed of the carousel in milliseconds.
     * Default: 3000
     */
    carouselSpeed?: number;
    /**
     * Whether to autoplay the carousel.
     * Default: true
     */
    carouselAutoplay?: boolean;
    /**
     * Maximum number of items to display at any one time.
     * Default: 3
     */
    maxItems?: number;
    /**
     * Read more label for truncated reviews.
     * Default: "Read more"
     */
    readMoreLabel?: string;
    /**
     * Read less label for expanded reviews.
     * Default: "Read less"
     */
    readLessLabel?: string;
    /**
     * Formatting function for relative dates.
     * Default: defaultGetRelativeDate
     */
    getRelativeDate?: (date: Date) => string;
    /**
     * Formatting function for absolute dates.
     * Default: (date) => date.toLocaleDateString()
     */
    getAbsoluteDate?: (date: Date) => string;
    /**
     * Show/hide navigation dots on the carousel
     * Default: true
     */
    showDots?: boolean;
} & CarouselCSSProps & ReviewCardCSSProps;
type ReactGoogleReviewsBadgeProps = ReactGoogleReviewsBasePropsWithRequired & {
    layout: "badge";
    /**
     * Google profile URL, if manually fetching Google Places API and passing `reviews`.
     * This is automatically fetched when passing `featurableId`.
     */
    profileUrl?: string;
    /**
     * Label for the badge.
     * Default: "Google Rating"
     */
    badgeLabel?: string;
    /**
     * Function to format the badge subheading.
     * Default: (totalReviewCount) => `Read our ${totalReviewCount} reviews`
     */
    badgeSubheadingFormatter?: (totalReviewCount: number) => string;
} & BadgeCSSProps;
type ReactGoogleReviewsCustomProps = ReactGoogleReviewsBasePropsWithRequired & {
    layout: "custom";
    renderer: (reviews: GoogleReview[]) => React$1.ReactNode;
};
type ReactGoogleReviewsProps = ReactGoogleReviewsCarouselProps | ReactGoogleReviewsCustomProps | ReactGoogleReviewsBadgeProps;
declare const ReactGoogleReviews: React$1.FC<ReactGoogleReviewsProps>;

declare class FetchPlaceReviewsError extends Error {
    code?: string | undefined;
    constructor(message: string, code?: string | undefined);
}
interface FetchPlaceReviewsBaseResponse {
    success: boolean;
}
interface FetchPlaceReviewsSuccessResponse extends FetchPlaceReviewsBaseResponse {
    success: true;
    reviews: GoogleReview[];
}
interface FetchPlaceReviewsErrorResponse extends FetchPlaceReviewsBaseResponse {
    success: false;
    error: FetchPlaceReviewsError;
}
type FetchPlaceReviewsResponse = FetchPlaceReviewsSuccessResponse | FetchPlaceReviewsErrorResponse;
/**
 * IMPORTANT: ONLY CALL THIS FUNCTION SERVER-SIDE TO AVOID EXPOSING YOUR API KEY TO THE CLIENT
 *
 * This function will fetch the reviews of a place using the Google Places API
 * and return them as an array of GoogleReview objects to pass to `ReactGoogleReviews` component.
 *
 * Create a Google API key and enable the Places API in the [Google Cloud Console](https://console.cloud.google.com).
 * You can find your Place ID using the [Place ID Finder Tool](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
 * For businesses without a physical address, see our [docs](https://featurable.com/docs/google-reviews/faq#how-to-get-google-reviews-for-a-business-without-a-physical-address).
 */
declare const dangerouslyFetchPlaceReviews: (placeId: string, apiKey: string) => Promise<FetchPlaceReviewsResponse>;

export { FeaturableAPIResponse, GoogleReview as ReactGoogleReview, ReactGoogleReviews, dangerouslyFetchPlaceReviews };
