module ExampleTests.UtilTimeTests exposing (..)

import Expect
import Test exposing (Test, describe, test)
import Time
import Util.Time exposing (..)


suite : Test
suite =
    describe "module Util.Time"
        [ describe "durationBetween"
            [ Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 1000) (Time.millisToPosix 1000)\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 1000) (Time.millisToPosix 1000))
                        Nothing
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 1000) (Time.millisToPosix 0)\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 1000) (Time.millisToPosix 0))
                        Nothing
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 2 * 60 * 1000 + 1000))\n    --> Just (Duration 1 2 3 4)" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 0) (Time.millisToPosix (4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 2 * 60 * 1000 + 1000)))
                        (Just (Duration 1 2 3 4))
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (24 * 60 * 60 * 1000 + 1000))\n    --> Just (Duration 1 0 0 1)" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 0) (Time.millisToPosix (24 * 60 * 60 * 1000 + 1000)))
                        (Just (Duration 1 0 0 1))
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (24 * 60 * 60 * 1000))\n    --> Just (Duration 0 0 0 1)" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 0) (Time.millisToPosix (24 * 60 * 60 * 1000)))
                        (Just (Duration 0 0 0 1))
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (60 * 60 * 1000))\n    --> Just (Duration 0 0 1 0)" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 0) (Time.millisToPosix (60 * 60 * 1000)))
                        (Just (Duration 0 0 1 0))
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (60 * 1000))\n    --> Just (Duration 0 1 0 0)" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 0) (Time.millisToPosix (60 * 1000)))
                        (Just (Duration 0 1 0 0))
            , Test.test "#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (1000))\n    --> Just (Duration 1 0 0 0)" <|
                \() ->
                    Expect.equal
                        (durationBetween (Time.millisToPosix 0) (Time.millisToPosix 1000))
                        (Just (Duration 1 0 0 0))
            ]
        , describe "formatDuration"
            [ Test.test "#formatDuration: \n\n    formatDuration (Duration 0 30 0 1)\n    --> \"1 day 30 minutes ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 0 30 0 1))
                        "1 day 30 minutes ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 0 47 6 2)\n    --> \"2 days 6 hours 47 minutes ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 0 47 6 2))
                        "2 days 6 hours 47 minutes ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 0 1 1 1)\n    --> \"1 day 1 hour 1 minute ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 0 1 1 1))
                        "1 day 1 hour 1 minute ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 0 0 0 3)\n    --> \"3 days ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 0 0 0 3))
                        "3 days ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 0 0 2 0)\n    --> \"2 hours ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 0 0 2 0))
                        "2 hours ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 0 1 0 0)\n    --> \"1 minute ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 0 1 0 0))
                        "1 minute ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 2 0 0 0)\n    --> \"2 seconds ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 2 0 0 0))
                        "2 seconds ago"
            , Test.test "#formatDuration: \n\n    formatDuration (Duration 1 0 0 0)\n    --> \"1 second ago\"" <|
                \() ->
                    Expect.equal
                        (formatDuration (Duration 1 0 0 0))
                        "1 second ago"
            ]
        ]
