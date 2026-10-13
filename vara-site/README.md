VARA WEBSITE: HOW TO USE THESE FILES
====================================
Open index.html in a browser to preview. Upload the whole folder to any web host
(Netlify, Cloudflare Pages, GitHub Pages, or normal hosting).

1. SET YOUR DOMAIN (do this before launch, it matters for Google)
   Search all files for  https://YOUR-DOMAIN.com  and replace it with your real
   address, for example https://www.vara.com . It appears in every page's head,
   in sitemap.xml and in robots.txt.

2. TURN ON THE CONTACT AND REVIEW FORMS
   Create a free form endpoint at Formspree, Web3Forms or Getform. Open site.js and
   paste the URL into  formEndpoint  (and any key into  formExtra  if the service needs
   one, for example {access_key:'...'} for Web3Forms). Until you do, the forms open the
   visitor's email app as a fallback.

3. ADD REAL REVIEWS (reviews.html)
   Find the line  <script type="application/json" id="reviews-data">[]</script>
   and put real reviews between the brackets, for example:
   [{"name":"Jane Smith","business":"Smith Bakery","rating":5,"text":"...","date":"Nov 2026","source":"Google","url":"https://...","early":true}]
   Only add reviews from real clients. When you have 3 or more, delete the line
   <meta name="robots" content="noindex,follow">  at the top of reviews.html and add
   reviews.html to sitemap.xml.

4. CLEAN ADDRESSES
   Pages are index.html, services.html and so on. Most hosts can show them as /services;
   if you set that up, keep the .html names in the files as they are.

5. AFTER LAUNCH
   Add the site to Google Search Console, submit sitemap.xml, and create a Google
   Business Profile for Vara.
