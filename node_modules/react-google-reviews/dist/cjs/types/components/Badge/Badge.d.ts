/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { BadgeCSSProps } from "../../types/cssProps";
import { Theme } from "../../types/review";
type BadgeProps = {
    averageRating: number;
    totalReviewCount: number;
    profileUrl?: string | null;
    theme?: Theme;
    badgeLabel?: string;
    badgeSubheadingFormatter?: (totalReviewCount: number) => string;
};
export declare const Badge: FC<BadgeProps & BadgeCSSProps>;
export {};
