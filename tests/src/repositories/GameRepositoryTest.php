<?php namespace JasonMichels\UnitTests\Repositories;

use JasonMichels\Repositories\GameRepository;
use PHPUnit_Framework_TestCase;
use \Mockery as mockery;
use Guzzle\Http\Client;

/**
 * Class GameRepositoryTest
 *
 * Tests for the game repository
 *
 * @package JasonMichels\UnitTests\Repositories
 * @author Jason Michels <michelsja@icloud.com>
 * @version $Id$
 */
class GameRepositoryTest extends PHPUnit_Framework_TestCase
{
    /**
     * Test class has correct contracts
     */
    public function testClassHasCorrectContracts()
    {
        $repo = new GameRepository();
        $this->assertInstanceOf(GameRepository::class, $repo);
    }

    /**
     * Test game repository can get array of videos to use as bubbles
     */
    public function testGameRepoCanGetBubbles()
    {
        $videos = [
            ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/93/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"],
            ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/92/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"],
            ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/91/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"],
            ["thumbnail" => "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/90/thumbs/hd--00001.png", "title" => "Motorcycle Bubble"]
        ];

        $httpClient = mockery::mock(Client::class);
        $httpClient->shouldReceive('get')->andReturnSelf();
        $httpClient->shouldReceive('send')->andReturnSelf();
        $httpClient->shouldReceive('json')->andReturn($videos);

        $repo = new GameRepository();
        $repo->setHttpClient($httpClient);

        $this->assertEquals($videos, $repo->getBubbles());
    }
}
