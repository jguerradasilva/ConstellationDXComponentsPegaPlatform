/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
interface CopyToClipboardProps extends PConnFieldProps {
    label?: string;
    value?: string;
    buttonPosition?: 'right' | 'left';
    readOnly?: boolean;
    disabled?: boolean;
    testId?: string;
}
declare const _default: (props: CopyToClipboardProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map