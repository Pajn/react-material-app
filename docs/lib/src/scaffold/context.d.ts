import { History } from 'history';
import { ValidationMap } from 'prop-types';
import { Action } from '../Actions';
export declare type Section = {
    path?: string;
    title: string;
    onBack?: (history: History) => void;
    onUnload?: () => void;
};
export declare type ScaffoldContext = {
    activeSection?: Section;
    pushSection: (section: Section) => void;
    popSection: (title: string) => void;
    replaceSection: (newSection: Section, oldTitle?: string) => void;
    setContextActions: (actions: Array<Action>) => void;
    clearContextActions: () => void;
};
export declare const scaffoldContextType: ValidationMap<ScaffoldContext>;
