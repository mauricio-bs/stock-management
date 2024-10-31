export enum LogActions {
  // AUTH
  SIGNIN = 'SIGNIN',

  // USER
  CREATE_USER = 'create-user',
  UPDATE_USER = 'update-user',
  UPDATE_USER_PASSWORD = 'update-user-password',
  GET_ONE_USER = 'get-one-user',
  GET_USERS = 'get-users',

  // COMPANY
  CREATE_COMPANY = 'create-company',
  UPDATE_COMPANY = 'update-company',
  DELETE_COMPANY = 'delete-company',
  GET_ONE_COMPANY = 'get-one-company',
  GET_COMPANIES = 'get-companies',

  // PRODUCT
  CREATE_PRODUCT = 'create-product',
  UPDATE_PRODUCT = 'update-product',
  DELETE_PRODUCT = 'delete-product',
  GET_ONE_PRODUCT = 'get-one-product',
  GET_PRODUCTS = 'get-products',

  // CATEGORY
  CREATE_CATEGORY = 'create-category',
  UPDATE_CATEGORY = 'update-category',
  DELETE_CATEGORY = 'delete-category',
  GET_ONE_CATEGORY = 'get-one-category',
  GET_CATEGORIES = 'get-categories',

  // SALE
  CREATE_SALE = 'create-sale',
  UPDATE_SALE = 'update-sale',
  DELETE_SALE = 'delete-sale',
  GET_ONE_SALE = 'get-one-sale',
  GET_SALES = 'get-sales',

  UNKNOWN = 'unknown-action',
}
