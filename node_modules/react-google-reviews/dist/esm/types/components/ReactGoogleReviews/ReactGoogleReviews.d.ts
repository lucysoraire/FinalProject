/** @jsxImportSource @emotion/react */
import React from "react";
import "../../css/index.css";
import { BadgeCSSProps, CarouselCSSProps, ErrorStateCSSProps, LoadingStateCSSProps, ReviewCardCSSProps } from "../../types/cssProps";
import { DateDisplay, GoogleReview, LogoVariant, NameDisplay, ReviewVariant, Theme } from "../../types/review";
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
    errorMessage?: React.ReactNode;
    /**
     * Customize the loading message when reviews are loading.
     * Default: "Loading reviews..."
     */
    loadingMessage?: React.ReactNode;
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
    renderer: (reviews: GoogleReview[]) => React.ReactNode;
};
type ReactGoogleReviewsProps = ReactGoogleReviewsCarouselProps | ReactGoogleReviewsCustomProps | ReactGoogleReviewsBadgeProps;
declare const ReactGoogleReviews: React.FC<ReactGoogleReviewsProps>;
export default ReactGoogleReviews;
