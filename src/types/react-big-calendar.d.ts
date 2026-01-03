declare module 'react-big-calendar' {
  import { Component } from 'react';
  
  export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
  
  export const Views: {
    MONTH: 'month';
    WEEK: 'week';
    WORK_WEEK: 'work_week';
    DAY: 'day';
    AGENDA: 'agenda';
  };
  
  export interface Event {
    title: string;
    start: Date;
    end: Date;
    resource?: any;
  }
  
  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor: string;
    endAccessor: string;
    views?: View[];
    view?: View;
    style?: React.CSSProperties;
    onView?: (view: View) => void;
    min?: Date;
    max?: Date;
  }
  
  export class Calendar extends Component<CalendarProps> {}
  
  export function momentLocalizer(moment: any): any;
}

