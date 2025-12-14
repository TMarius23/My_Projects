module Effect exposing (..)

import Http
import Json.Decode
import Model exposing (Msg(..))
import Model.Post exposing (Post)
import Model.PostIds exposing (HackerNewsItem, PostIds, itemName)
import Task
import Time
import Url.Builder as UrlBuilder


type Effect
    = NoEffect
    | GetTime
    | GetItems
        { apiUrl : String
        , item : HackerNewsItem
        , onResult : Result Http.Error (Maybe PostIds) -> Msg
        , decoder : Json.Decode.Decoder (Maybe PostIds)
        }
    | GetPost
        { apiUrl : String
        , postId : Int
        , onResult : Result Http.Error Post -> Msg
        , decoder : Json.Decode.Decoder Post
        }


performEffect : Effect -> Cmd Msg
performEffect effect =
    case effect of
        NoEffect ->
            Cmd.none

        GetTime ->
            Task.perform GotTime Time.now

        GetItems { apiUrl, item, onResult, decoder } ->
            Http.get
                { url = UrlBuilder.crossOrigin apiUrl [ "v0", itemName item ++ "stories.json" ] []
                , expect = Http.expectJson onResult decoder
                }

        GetPost { apiUrl, postId, onResult, decoder } ->
            let
                id =
                    String.fromInt postId ++ ".json"
            in
            Http.get
                { url = UrlBuilder.crossOrigin apiUrl [ "v0", "item", id ] []
                , expect = Http.expectJson onResult decoder
                }
