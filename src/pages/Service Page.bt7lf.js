import { location } from '@wix/site-location';

const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

$w.onReady(function () {
    location.to(INQUIRY_URL);
});
