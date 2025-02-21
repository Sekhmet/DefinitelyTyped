// Type definitions for angular-block-ui 0.2
// Project: https://github.com/McNull/angular-block-ui
// Definitions by: Lasse Nørregaard <https://github.com/lassebn>
//                 Stephan Classen <https://github.com/sclassen>
//                 Soner Köksal <https://github.com/renjfk>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import * as angular from "angular";

declare module "angular" {
    namespace blockUI {
        interface BlockUIConfig {
            /**
             * Changes the default message to be used when no message
             * has been provided to the start method of the service.
             *
             * Default value is 'Loading ...'.
             */
            message?: string | undefined;

            /**
             * Specifies the amount in milliseconds before the block
             * is visible to the user. By delaying a visible block your
             * application will appear more responsive.
             *
             * The default value is 250.
             */
            delay?: number | undefined;

            /**
             * Specifies a custom template to use as the overlay.
             */
            template?: string | undefined;

            /**
             * Specifies a url to retrieve the template from.
             * The current release only works with pre-cached templates,
             * which means that this url should be known in the
             * $templateCache service of Angular.
             *
             * If you're using the grunt with html2js or angular-templates,
             * which I highly recommend, you're already set.
             */
            templateUrl?: string | undefined;

            /**
             * By default the BlockUI module will start a block whenever
             * the Angular $http service has an pending request.
             *
             * If you don't want this behaviour and want to do all the
             * blocking manually you can change this value to false.
             *
             * The default value is 'true'
             */
            autoBlock?: boolean | undefined;

            /**
             * By default the BlockUI module will reset the block count and
             * hide the overlay whenever an exception has occurred.
             *
             * You can set this value to false if you don't want this behaviour.
             *
             * The default value is 'true'
             */
            resetOnException?: boolean | undefined;

            /**
             * Allows you to specify a filter function to exclude certain ajax
             * requests from blocking the user interface.
             * The blockUI service will ignore requests when the function returns `false`.
             *
             * If the filter function returns a string it will be passed as the message
             * argument to the start method of the service.
             *
             * @param config the Angular request config object.
             */
            requestFilter?(config: IRequestConfig): string | boolean;

            /**
             * When the module is started it will inject the main block element
             * by adding the "block-ui" directive to the <body> element.
             *
             * Set this to false if there no need for any fullscreen blocking or if there's
             * more control required. For instance when your ng-app directive is a child
             * element of the body element it is impossible for the blockUI resolve the main
             * instance. In such a case the auto injection of the main block scope should
             * be disabled and the main block element should be relocated.
             *
             * The default value is 'true'
             */
            autoInjectBodyBlock?: boolean | undefined;

            /**
             * A string containing the default css classes (separated by spaces)
             * that should be applied to each block-ui element.
             *
             * The default value is "block-ui block-ui-anim-fade"
             */
            cssClass?: string | undefined;

            /**
             * While a user interface block is active the user can still navigate
             * away using the back and forward buttons of the browser.
             *
             * Callbacks registered to handle responses from the server will
             * be executed even if a different view/controller is active at the
             * time the response arrives.
             *
             * You can set this value to true if you want to prevent navigation
             * with the browser back and forward buttons while a fullscreen
             * block is active.
             *
             * Programatic location changes via the $location service are still
             * allowed however.
             *
             * The default value is 'false'
             */
            blockBrowserNavigation?: boolean | undefined;
        }

        interface BlockUIService {
            /**
             * The start method will start the user interface block.
             * Because multiple user interface elements can request
             * a user interface block at the same time, the service
             * keeps track of the number of start calls.
             *
             * Each call to start() will increase the count and every
             * call to stop() will decrease the value.
             * Whenever the count reaches 0 the block will end.
             *
             * Note: By default the block is immediately active after
             * calling this method, but to prevent trashing the user
             * interface each time a button is pressed, the block is
             * visible after a short delay.
             *
             * This behaviour can be modified in the configuration.
             *
             * @param messageOrOptions
             *     Either supply the message (string) to be show in the
             *     overlay or specify an IBlockUIConfig object that will be
             *     merged/extended into the block ui instance state.
             *     If no argument is specified the default text message
             *     from the configuration is used.
             */
            start(messageOrOptions?: string | BlockUIConfig): void;

            /**
             * This will decrease the block count.
             *
             * The block will end if the count is 0.
             */
            stop(): void;

            /**
             * The reset will force an unblock by setting the block count to 0.
             */
            reset(): void;

            /**
             * Queues a callback function to be called when the block has finished.
             *
             * This can be useful whenever you wish to redirect the user
             * to a different location while there are still pending AJAX requests.
             */
            done(doneCallback: () => void): void;

            /**
             * Allows the message shown in the overlay to be updated
             * while to block is active.
             *
             * @param message The message to show in the overlay.
             */
            message(message: string): void;

            /**
             * Returns whether currently a block is shown for the instance or not.
             */
            isBlocking(): boolean;

            instances: BlockUIInstances;
        }

        interface BlockUIInstances {
            get(id: string): BlockUIService;
        }
    }
}
