import type { HtmlHTMLAttributes } from 'react';
import type { ErrorProps } from 'react-admin';
import type { FallbackProps } from 'react-error-boundary';
export declare const ErrorClasses: {
    container: string;
    title: string;
    logo: string;
    panel: string;
    panelSummary: string;
    panelDetails: string;
    toolbar: string;
    advice: string;
};
interface InternalErrorProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'>, Partial<Pick<FallbackProps, 'resetErrorBoundary'>>, ErrorProps {
    className?: string;
}
declare const CustomError: ({ error, errorInfo, title, resetErrorBoundary, className, ...rest }: InternalErrorProps) => JSX.Element;
export default CustomError;
//# sourceMappingURL=Error.d.ts.map