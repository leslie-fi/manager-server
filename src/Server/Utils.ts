import {
  URLSearchParams,
  UrlWithParsedQuery,
  UrlWithStringQuery,
} from 'node:url';

export class Utils {
  public static getUrlBasePath(url: string | undefined): string {
    const input = url ? url : 'a';
    const parsedUrl = new URL(input, 'https://localhost:8080');
    console.log('got request from', parsedUrl.pathname!);
    return parsedUrl.pathname!.slice(1);
  }

  public static getQueryParams(url: string, params: string): string | null {
    if (url) {
      const parsedUrl = new URL(url, 'https://localhost:8080');
      return parsedUrl.searchParams.get(params);
    } else {
      console.error(`invalid url ${url}`);
      return '';
    }
  }
}

//  const parsedUrl = new URL('https://example.org/users?id=123')

//  console.log('params:',parsedUrl.search.includes(`?${params}=`));
