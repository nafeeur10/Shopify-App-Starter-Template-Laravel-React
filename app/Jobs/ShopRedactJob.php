<?php namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;

class ShopRedactJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly ShopDomain $shopDomain, private readonly stdClass $data){}

    public function handle()
    {
        rescue(function () {
            $shop = User::where('name', $this->shopDomain->toNative())->first();
            if($shop) {
                $shop->delete();
            }
        });
    }
}
