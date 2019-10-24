export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8089/api/';
export const API_ITEM_URL = API_BASE_URL + 'item/';
export const API_ITEM_STOCK_URL = API_BASE_URL + 'stock/';
export const API_PARTY_URL = API_BASE_URL + 'party/';
export const API_PARTY_BALANCE_URL = API_BASE_URL + 'balance/';
export const API_INVOICE_URL = API_BASE_URL + 'invoice/';
export const API_INVOICE_DTL_URL = API_BASE_URL + 'invoiceDtl/';

export const ACCESS_TOKEN = 'accessToken';

export const POLL_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
