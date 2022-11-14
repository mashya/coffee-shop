import { capitalize } from 'lodash-es';

export class StringUtil{
    public static capitalize(key: string): string {
        return capitalize(key);
      }
}