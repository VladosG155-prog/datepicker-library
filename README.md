# Getting Started

### 1. Add `datepicker-library` to your dependencies:

```bash
npm install @vladosg155/datepicker-library # with npm
pnpm install @vladosg155/datepicker-library # with pnpm
yarn add @vladosg155/datepicker-library # with yarn
```

#### 2. When importing, include the DayPicker CSS in your component:

```bash

import {DatePicker} from @vladosg155/datepicker-library
import  "@vladosg155/datepicker-library/dist/index.css"

function  Component()  {
return  <DayPicker  />;
}
```

#### 3. Props

-   withRange?: // Enables selecting date range
-   viewType?: // Type of calendar view ('month', 'year', 'week') (def: 'month)
-   onChange={(val: string)=>val} // Handler for selected date change
-   withTodos?: // Enables displaying todos on the calendar
-   withMondayFirst?:// Start of the week on Monday
-   activeDate?: // start selectedDate(format: DD/MM/YYYY) - default datepicker
-   DD/MM/YYYY-DD/MM/YYYY - range datepicker
-   maxDate?: Date // max date for datepicker
-   minDate?: Date // min date for datepicker

```bash
import {DatePicker} from @vladosg155/datepicker-library
import  "@vladosg155/datepicker-library/dist/index.css"

function  Component()  {
return  <DayPicker
		    withRange
			withTodos
			withMondayFirst
			viewType='month'
			activeDate='12/02/2024/
			maxDate={new Date("DATE")}
			minDate={new Date("DATE")}
			onChange={(val)=>log(val)}
 />;
}
```
