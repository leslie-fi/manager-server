export class Utils {
  public static getUrlBasePath(url: string | undefined): string {
    const input = url ? url : 'a';
    const parsedUrl = new URL(input, 'https://localhost:8080')
    console.log('got request from',parsedUrl.pathname!);
    return parsedUrl.pathname!.slice(1)
  }
}
