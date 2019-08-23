## Installing

```sh
yarn
yarn dev
```

## Demo

[frontend.jakbyco.now.sh](https://frontend.jakbyco.now.sh)

## Overview

I start this project from creating graphQL server but I came to the conclusion that is taking a shortcut.
I based on 2 APIs. First API runs when adding company symbol then save response to local storage. After redirect to companies, I send a request to the second API to get logo and domain. I should also save this data to local storage but I haven't had enough time in recent days to implement all features.

## Requirements

1. As a user I want to provide the symbol of a company I want to track financial data for.

2. As a user I want to see a list of tracked companies with details (name, website address, logo, trading hours, symbol, price, price change) that will show newest data for those companies on every page refresh.

Dokumentacja APIs, które udostępniają wspomniane dane:

1. Alpha Vantage - https://www.alphavantage.co/documentation/

• Jako API Key można użyć dowolnego losowego łańcucha znaków, ale traktuj go jakby był unikatowy i mógł się różnić między środowiskami (produkcja/staging).

• API wspiera CORS.

• Główne ciekawe endpointy to: Search Endpoint, Quote Endpoint, Intraday, Daily.

2. Clearbit Logo API - przykład użycia: https://autocomplete.clearbit.com/v1/companies/suggest?query=Alphabet

• Endpoint wspiera CORS oraz nie wymaga kluczy API

• Warto zauważyć, że usuwając z nazwy firmy sufiksy takie “Inc.”, “L.P.” wspomniany endpoint zwraca poprawne dane z dużą dokładnością.

Wymagania techniczne:

1. Staraj się zachować znane Ci dobre praktyki tak jakby aplikacja była produkcyjna. Dokładnie przemyśl organizację kodu źródłowego oraz architekturę.

2. Użyj biblioteki React.

3. Wygląd (UI) aplikacji powinien być możliwie prosty. Możesz stworzyć kod CSS od podstaw lub użyć biblioteki Bootstrap albo Foundation.

4. Super będzie jeśli kod umieścisz na Githubie (lub innej platformie jeśli chcesz, żeby repozytorium było prywatne) oraz historia commitów będzie przejrzysta i dobrze opisana.

5. W ocenie realizacji pomoże plik README z opisem architektury oraz w jaki sposób uruchomić i przetestować aplikację.

6. (Opcjonalnie) Umieść w Internecie działającą aplikację (np. na GitHub Pages).
