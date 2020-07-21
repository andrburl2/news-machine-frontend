import './index.css';

import { Header } from '../../javascript/components/Header';
import { HEADER_DATA } from '../../javascript/constants/header';

import { NewsCard } from '../../javascript/components/NewsCard';

import { NewsCardList } from '../../javascript/components/NewsCardList';
import { NEWS_CARD_LIST_DATA } from '../../javascript/constants/news-card-list';

import { Info } from '../../javascript/components/Info';
import { INFO_DATA } from '../../javascript/constants/info';

import { MainApi } from '../../javascript/api/MainApi';
import { MAIN_API_DATA } from '../../javascript/constants/main-api';

const pageName = 'articles';

const header = new Header(HEADER_DATA, pageName);

const newsCard = new NewsCard(pageName);

const newsCardList = new NewsCardList(NEWS_CARD_LIST_DATA, pageName);

const info = new Info(INFO_DATA);

const mainApi = new MainApi(MAIN_API_DATA);


header.setHandlers();
header.handleCallbacks(mainApi.getUserData, mainApi.logout, newsCardList.clearResults);
header.render();

newsCard.handleCallbacks(mainApi.getArticles, mainApi.createArticle, mainApi.removeArticle);

newsCardList.handleCallbacks(newsCard.create, mainApi.getArticles);
newsCardList.renderSavedNews();

info.handleCallbacks(mainApi.getUserData, mainApi.getArticles);
info.renderInfo();