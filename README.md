For creating the Gutenberg blocks:
1. Created a custom plugin for independent management of custom Gutenberg blocks. Command used:   ```npx @wordpress/create-block@latest <plugin_name> --variant=dynamic```
2. Hence, a structure is formed as in the following format
   <img width="820" height="327" alt="image" src="https://github.com/user-attachments/assets/c0c42d57-bdb7-4ad3-aba7-3a3315fefbe9" />
3. Then inside src folder, add the needed blocks with cmd: ```npx @wordpress/create-block@latest <block_name> --variant=dynamic --namespace=<plugin_name> --no-plugin```
4. Hence, a structure is formed as in the following format
  <img width="1032" height="471" alt="image" src="https://github.com/user-attachments/assets/25589fca-2488-4776-b26f-5ce50527cdb5" />

5. Code edits:
In case of block.json file attributes are the key thing to be updated:
  <img width="636" height="619" alt="image" src="https://github.com/user-attachments/assets/f52343f7-fa8c-48a8-b283-0bb81652fd8a" />
  
  This determines what all fields are used in the editor section.

In edit.js file you should setup how the backend editor view with fields. To be updated via React.Js

In editor.scss (styles for backend view).
In render.php, mention how the fields are rendered and the layout to be displayed in the frontend. Here I have setup a layout folder to choose different layout and added it in render.php
  <img width="817" height="540" alt="image" src="https://github.com/user-attachments/assets/f1e0e076-9fe8-4d7d-8a22-f8b30c577e92" />
In style.scss (styles for frontend view).

  

