<?php namespace JasonMichels\Repositories;

use Guzzle\Http\Client;

/**
 * Class GameRepository
 *
 * Get the motorcycle data that will be shown as bubbles
 *
 * @package JasonMichels\Repositories
 * @author Jason Michels <michelsja@icloud.com>
 * @version $Id$
 */
class GameRepository
{
    /**
     * @var Client
     */
    private $httpClient;

    /**
     * Set the http client
     *
     * @param Client $httpClient
     * @return $this
     */
    public function setHttpClient(Client $httpClient)
    {
        $this->httpClient = $httpClient;
        return $this;
    }

    /**
     * Get the http client
     *
     * @return Client
     */
    public function getHttpClient()
    {
        if (!$this->httpClient) {
            $this->httpClient = new Client();
        }

        return $this->httpClient;
    }
    /**
     * Get motorcycle videos that will be shown as bubbles
     *
     * @return array
     */
    public function getBubbles()
    {
        try {
            $response = $this->getHttpClient()->get("http://bikefree.tv/api/videos", ['Content-Type' => 'application/json'], ['timeout' => 40, 'connect_timeout' => 1.5])->send();
            $data = $response->json();
            $videos = $data['videos'];
        } catch (\Exception $e) {
            $videos = [
                ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/93/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"],
                ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/92/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"],
                ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/91/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"],
                ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/90/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"]
            ];
        }

        return $videos;
    }
}