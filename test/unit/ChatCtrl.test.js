describe('Chat', function() {
    beforeEach(function() {
        module('starter');
        module(function($provide, $urlRouterProvider) {
            $provide.value('$ionicTemplateCache', function() {});
            $urlRouterProvider.deferIntercept();
        })
    });


    describe('Controller', function() {
        var $rootScope;
        var chats = [1, 2, 3];
        var chatsSpy = {
            all: jasmine.createSpy('Chat.all Spy').and.returnValue(chats),
            remove: jasmine.createSpy('Chat.remove spy').and.callFake(function() {
                chats.splice(0, 1);
            })
        };
        var scopeSpy = {};

        beforeEach(function() {
            inject(function($controller, _$rootScope_) {
                $rootScope = _$rootScope_;
                chatController = $controller('ChatsCtrl', {
                    $scope: scopeSpy,
                    Chats: chatsSpy,
                });
            });
        });

        it('should call chat.all when first loaded', function() {
            expect(chatsSpy.all).toHaveBeenCalled();
            expect(scopeSpy.chats).toEqual(chats);
        });

        it('should call chat.remove', function() {
            expect(typeof scopeSpy.remove).toEqual('function');
            scopeSpy.remove(1);
            $rootScope.$digest();
            expect(chatsSpy.remove).toHaveBeenCalledWith(1);
            expect(scopeSpy.chats).toEqual(chats);
        });
    });
});
