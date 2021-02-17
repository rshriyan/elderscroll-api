# elderscroll-api

Hello,

For the solution I have made the following decisions:
1. For showing progressive rendering I have made use of ghost elements, 
   so user UI paint happens immediately while data loads.
2. Handled API failure by clearing out the ghost cards.
3. Kept the cards UI simple.
4. Haven't added a no results found message for searching.
5. Scrolling stops when there is no more data to load or is buffered if there is more data to load but api is busy.


I have chosen the following frameworks to focus on the business requirements: <br>
1. Angular+RxJs
2. Ngrx for state management
3. bootstrap with default settings for layout and utility classes
4. ngx-skeleton-loader for creating ghost loading indicators
5. ngx-infinite-scroll to accurately tracking scroll events

How to run:

1. npm install
2. npm run start
3. Visit http://localhost:4200

I hope you like it. Thank you for the opportunity and I appreciate you taking the time for me.
