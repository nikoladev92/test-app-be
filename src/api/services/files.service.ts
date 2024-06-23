import { Service } from "typedi";
import axios from 'axios';
@Service()
export class FilesService {
  apiUrl = 'https://rest-test-eight.vercel.app/api/test'
  constructor() {}

  public async fetchFiles(){
    const response = await axios.get(this.apiUrl);
    const data = response.data;

    const transformedData: Record<string, any[]> = {};

    data.items.forEach((item: { fileUrl: string }) => {
        const parts = item.fileUrl.split('/');
        const ipAddress = parts[2];
        const path = parts.slice(3).join('/');
  
        if (!transformedData[ipAddress]) {
          transformedData[ipAddress] = [];
        }
  
        const directories = path.split('/');
        let currentLevel = transformedData[ipAddress];
  
        directories.forEach((directory, index) => {
          const isFile = index === directories.length - 1;
  
          if (isFile) {
            currentLevel.push(directory);
          } else {
            let existingEntry = currentLevel.find((item) => typeof item === 'object' && Object.keys(item)[0] === directory);
  
            if (!existingEntry) {
              existingEntry = { [directory]: [] };
              currentLevel.push(existingEntry);
            }
  
            currentLevel = existingEntry[directory];
          }
        });
      });
  
      const removeEmptyItems = (obj: any) => {
        Object.keys(obj).forEach(key => {
          if (Array.isArray(obj[key])) {
            obj[key] = obj[key].filter(item => {
              if (Array.isArray(item)) {
                item = item.filter(subitem => subitem !== ''); 
                return item.length > 0;
              }
              return item !== '' && (typeof item !== 'object' || Object.keys(item).length > 0);
            });
            obj[key].forEach(item => {
              if (typeof item === 'object') {
                removeEmptyItems(item);
              }
            });
          }
        });
        return obj;
      };
  
      const cleanedData = removeEmptyItems(transformedData);
  
   return cleanedData
  }
}
