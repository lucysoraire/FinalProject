/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { CarouselCSSProps, ReviewCardCSSProps } from "../../types/cssProps";
import { DateDisplay, GoogleReview, LogoVariant, NameDisplay, ReviewVariant, Theme } from "../../types/review";
type CarouselProps = {
    reviews: GoogleReview[];
    maxCharacters?: number;
    nameDisplay?: NameDisplay;
    logoVariant?: LogoVariant;
    dateDisplay?: DateDisplay;
    reviewVariant?: ReviewVariant;
    carouselSpeed?: number;
    carouselAutoplay?: boolean;
    maxItems?: number;
    theme?: Theme;
    accessibility?: boolean;
    readMoreLabel?: string;
    readLessLabel?: string;
    getAbsoluteDate?: (date: Date) => string;
    getRelativeDate?: (date: Date) => string;
    showDots?: boolean;
};
export declare const Carousel: FC<CarouselProps & CarouselCSSProps & ReviewCardCSSProps>;
export {};
