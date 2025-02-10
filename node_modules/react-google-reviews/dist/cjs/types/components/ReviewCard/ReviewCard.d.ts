/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { ReviewCardCSSProps } from "../../types/cssProps";
import { DateDisplay, GoogleReview, LogoVariant, NameDisplay, ReviewVariant, Theme } from "../../types/review";
type ReviewCardProps = {
    review: GoogleReview;
    maxCharacters?: number;
    nameDisplay?: NameDisplay;
    logoVariant?: LogoVariant;
    dateDisplay?: DateDisplay;
    reviewVariant?: ReviewVariant;
    theme?: Theme;
    readMoreLabel?: string;
    readLessLabel?: string;
    getAbsoluteDate?: (date: Date) => string;
    getRelativeDate?: (date: Date) => string;
};
export declare const ReviewCard: FC<ReviewCardProps & ReviewCardCSSProps>;
export {};
