import { GoogleReview } from "../types/review";
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
export declare const dangerouslyFetchPlaceReviews: (placeId: string, apiKey: string) => Promise<FetchPlaceReviewsResponse>;
export {};
