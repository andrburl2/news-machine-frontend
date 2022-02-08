import './index.css';

import { SigninPopup } from '../../javascript/components/SigninPopup';
import { SIGNIN_POPUP_DATA } from '../../javascript/constants/signin-popup';

import { SignupPopup } from '../../javascript/components/SignupPopup';
import { SIGNUP_POPUP_DATA } from '../../javascript/constants/signup-popup';

import { SuccessPopup } from '../../javascript/components/SuccessPopup';
import { SUCCESS_POPUP_DATA } from '../../javascript/constants/success-popup';

import { Validation } from '../../javascript/components/Validation';
import { VALIDATION_DATA } from '../../javascript/constants/validation';

import { Header } from '../../javascript/components/Header';
import { HEADER_DATA } from '../../javascript/constants/header';

import { Search } from '../../javascript/components/Search';
import { SEARCH_DATA } from '../../javascript/constants/search';

import { NewsCard } from '../../javascript/components/NewsCard';

import { NewsCardList } from '../../javascript/components/NewsCardList';
import { NEWS_CARD_LIST_DATA } from '../../javascript/constants/news-card-list';

import { MainApi } from '../../javascript/api/MainApi';
import { MAIN_API_DATA } from '../../javascript/constants/main-api';

import {NewsApi } from '../../javascript/api/NewsApi';
import { NEWS_API_DATA } from '../../javascript/constants/news-api';

const pageName = 'main';

const signinPopup = new SigninPopup(SIGNIN_POPUP_DATA);

const signupPopup = new SignupPopup(SIGNUP_POPUP_DATA);

const successPopup = new SuccessPopup(SUCCESS_POPUP_DATA);

const validation = new Validation(VALIDATION_DATA);

const header = new Header(HEADER_DATA, pageName);

const search = new Search(SEARCH_DATA);

const newsCard = new NewsCard(pageName);

const newsCardList = new NewsCardList(NEWS_CARD_LIST_DATA, pageName);

const mainApi = new MainApi(MAIN_API_DATA);

const newsApi = new NewsApi(NEWS_API_DATA);

signinPopup.setHandlers();
signinPopup.handleCallbacks(mainApi.signin, header.render, header.closeMobileNav);

signupPopup.setHandlers();
signupPopup.handleCallbacks(mainApi.signup, successPopup.open);

successPopup.setHandlers();

validation.setHandlers();

header.setHandlers();
header.handleCallbacks(mainApi.getUserData, mainApi.logout, newsCardList.clearResults);
header.render();

search.handleCallback(newsApi.getNews);

newsCard.handleCallbacks(mainApi.getArticles, mainApi.createArticle, mainApi.removeArticle);

newsCardList.setHandlers();
newsCardList.handleCallbacks(newsCard.create, search.submit);