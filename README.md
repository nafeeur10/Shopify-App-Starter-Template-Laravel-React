## Shopify App Starter Template with Laravel and React

Created this solution with this https://github.com/Kyon147/laravel-shopify open source solution. Added React as a front-end technologies. It also supports SPA. Let's describe this in detail about this solution. It might be helpful for everyone who wants to build a Shopify App with Laravel and React

### Prerequisite
 - Composer
 - Nodejs
 - Ngrok (for local development)

### Install Laravel and Integrate the package
 - `composer create-project laravel/laravel shopify-app`
 - `composer require kyon147/laravel-shopify`
 - `php artisan vendor:publish --tag=shopify-config`

### CSRF

You have to disable CSRF token verification. 

Open `\App\Http\Middleware\VerifyCsrfToken.php`, and add or edit:

```
protected $except = [
    '*',
];
```

### Configuration

Routing:
Add Shopify verification middleware to Routing like the below:

```
Route::middleware(['verify.shopify'])->group(function() {
    Route::view('/', 'app')->name('home');
});
```

View:
`app.blade.php` File:

```
<!DOCTYPE html>
<html lang="en">
<head>
    @viteReactRefresh
    @vite('resources/js/index.jsx')
</head>
<body>
    
</body>
</html>
```

Model > User.php:

Include ShopModel trait
Like the below:

```
use Osiset\ShopifyApp\Contracts\ShopModel as IShopModel;
use Osiset\ShopifyApp\Traits\ShopModel;
```

```
class User extends Authenticatable implements IShopModel
{
    use Notifiable;
    use ShopModel;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```

### Connect with Shopify

 - Need a Partner Account
 - Create an APP Manually
 - Collect the credentials
 - ![Collect Shopify App Credentials](https://github.com/nafeeur10/app/assets/10268310/40a03825-6ea3-48fb-8ff8-feac5fe2106d)

 - Edit .env file
 ```
   SHOPIFY_APP_NAME=App_Name
   VITE_SHOPIFY_API_KEY=
   SHOPIFY_API_KEY=
   SHOPIFY_API_SECRET=
```

### Start the Project

 - `php artisan migrate`
 - `npm install`
 - `npm run dev`
 - `ngrok http 8000` (If the port is 8000)
 - Put ngrok URL to Shopify URL part 
   ![Shopify URL](https://github.com/nafeeur10/app/assets/10268310/d381127e-e0ec-4ea7-a32d-5e0c8945fe3a)


### Setup SPA with React

1. Change the front-end engine to REACT in `config/shopify-app.php` or add the below line to `.env`
```
SHOPIFY_FRONTEND_ENGINE=REACT
```

2. Then install dependencies of React
```
npm install react react-dom @vitejs/plugin-react
```

3. Create an entry point `index.jsx`

```
import { createRoot } from 'react-dom/client'
import App            from './App'
import '@shopify/polaris/build/esm/styles.css'

const root = document.createElement('div')
document.body.appendChild(root)
createRoot(root).render(<App />)
```

4. Create `App.jsx`

```
const App = () => {
    return (
        <h1>Bismillahir Rohmanir Rohim</h1>
    );
};

export default App;
```

5. Add react to `vite.config.js`

```
import react from '@vitejs/plugin-react'
plugins: [
    laravel({
        input: ['resources/js/index.jsx'],
        refresh: true,
    }),
    react()
]
```

Now you can test the Shopify app with the store.....